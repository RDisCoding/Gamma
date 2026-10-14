'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
    __motionReady?: boolean;
  }
}

/**
 * Smooth scrolling, scroll-triggered reveals and light parallax for the whole
 * site. Everything here is progressive: without JavaScript, or with reduced
 * motion requested, content is simply shown.
 */
export default function MotionProvider() {
  const pathname = usePathname();

  // Smooth scrolling (wheel only — touch devices keep native scrolling).
  useEffect(() => {
    window.__motionReady = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: { offset: -96 } });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Start each new page at the top and wire up reveals / parallax for it.
  useEffect(() => {
    if (!window.location.hash) window.__lenis?.scrollTo(0, { immediate: true, force: true });

    const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in), [data-reveal-lines]:not(.is-in)');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    revealables.forEach((el) => io.observe(el));

    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const canParallax =
      parallaxEls.length > 0 &&
      window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = Number(el.dataset.parallax) || 0.1;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax);
    };
    if (canParallax) {
      updateParallax();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
