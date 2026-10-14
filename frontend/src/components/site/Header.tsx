'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { company } from '../../content/company';
import { navigation } from '../../content/site';
import type { Dictionary } from '../../i18n/en';
import { localePath, type SiteLocale } from '../../i18n/config';
import { telHref, whatsappHref } from '../../lib/contact';
import BinduMark from './BinduMark';
import LanguagePicker from './LanguagePicker';

export interface HeaderText {
  common: Dictionary['common'];
  nav: Dictionary['nav'];
  tagline: string;
  header: Dictionary['header'];
  languageMenu: Dictionary['languageMenu'];
  meetingPointName: string;
  scamShort: string;
}

const inlineKeys = ['guide', 'services', 'visit', 'about'];

export default function Header({ locale, text }: { locale: SiteLocale; text: HeaderText }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const lp = (path: string) => localePath(locale, path);
  const items = navigation.map((item) => ({ ...item, href: lp(item.href), label: text.nav[item.key] }));

  // Solid background once the page moves; tuck away while reading downwards.
  // Smooth scrolling eases out in many sub-pixel steps, so the header only
  // changes state after a deliberate movement in one direction (hysteresis);
  // smaller movements keep whatever state it is already in.
  useEffect(() => {
    const THRESHOLD = 12;
    let anchorY = Math.max(0, window.scrollY);
    let isHidden = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 24);
      if (y < 120) {
        isHidden = false;
        anchorY = y;
      } else if (y - anchorY > THRESHOLD) {
        isHidden = true;
        anchorY = y;
      } else if (anchorY - y > THRESHOLD) {
        isHidden = false;
        anchorY = y;
      }
      setHidden(isHidden);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Freeze the page behind the open menu and let Escape close it.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const enquiryHref = whatsappHref(text.common.defaultWhatsappMessage);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-80 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        {text.common.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-700 ease-out-expo ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled && !open ? 'bg-paper/95 shadow-[0_1px_0_var(--color-line)] lg:bg-paper/85 lg:backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link
            href={lp('/')}
            onClick={close}
            className={`group flex min-w-0 items-center gap-2.5 transition-colors duration-500 sm:gap-3 ${open ? 'text-paper' : 'text-ink'}`}
          >
            <BinduMark className="h-8 w-6 shrink-0 sm:h-9 sm:w-7 transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5" />
            <span className="flex flex-col whitespace-nowrap leading-none">
              <span translate="no" className="font-wordmark text-[1.3rem] tracking-tight sm:text-[1.45rem]">
                Matrugaya Tirth
              </span>
              <span className="eyebrow mt-1 hidden text-[0.6rem] opacity-80 sm:block">{text.tagline}</span>
            </span>
          </Link>

          <nav aria-label={text.header.primaryNav} className={`hidden items-center gap-8 lg:flex ${open ? 'invisible' : ''}`}>
            {items
              .filter((item) => inlineKeys.includes(item.key))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`link-draw py-1 text-[0.92rem] font-medium ${isActive(item.href) ? 'text-sindoor' : 'text-ink'}`}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguagePicker locale={locale} labels={text.languageMenu} tone={open ? 'light' : 'dark'} />
            <a
              href={enquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="header"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-500 sm:inline-flex ${
                open ? 'bg-paper text-ink' : 'bg-ink text-paper hover:bg-sindoor'
              }`}
            >
              <FaWhatsapp aria-hidden="true" />
              {text.common.enquire}
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`group flex h-11 items-center gap-3 rounded-full pl-3 pr-2 text-sm font-semibold transition-colors duration-500 sm:pl-4 sm:pr-3 ${
                open ? 'text-paper' : 'text-ink'
              }`}
            >
              {/* Both labels stay in the DOM (toggled by class) so a translated page keeps working. */}
              <span className={`max-[459px]:sr-only ${open ? 'hidden' : ''}`}>{text.common.menu}</span>
              <span className={`max-[459px]:sr-only ${open ? '' : 'hidden'}`}>{text.common.close}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-500 ease-out-expo ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] bg-current transition-all duration-500 ease-out-expo ${
                    open ? 'top-1.5 w-6 -rotate-45' : 'top-3 w-4 group-hover:w-6'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu. Always in the HTML (so links stay crawlable) but inert while closed. */}
      <div
        id="site-menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-dusk text-paper transition-[clip-path,visibility] duration-900 ease-in-out-quart ${
          open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <div className="mx-auto grid min-h-full max-w-[1440px] gap-12 px-5 pb-28 pt-28 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-12 lg:pb-16">
          <nav aria-label={text.header.siteMenu}>
            <ol className="space-y-1">
              {items.map((item, i) => (
                <li key={item.href} className="overflow-hidden" style={{ transitionDelay: open ? `${150 + i * 45}ms` : '0ms' }}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`group flex items-baseline gap-5 py-1 transition-transform duration-900 ease-out-expo ${
                      open ? 'translate-y-0' : 'translate-y-full'
                    }`}
                    style={{ transitionDelay: open ? `${150 + i * 45}ms` : '0ms' }}
                  >
                    <span className="eyebrow w-8 text-marigold/80">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className={`font-display text-[clamp(2.2rem,6.2vw,4.75rem)] leading-[1.08] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-marigold ${
                        isActive(item.href) ? 'text-marigold' : ''
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div
            className={`flex flex-col justify-end gap-10 transition-[opacity,transform] duration-700 ${
              open ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-6 opacity-0'
            }`}
          >
            <div>
              <p className="eyebrow text-marigold">{text.header.speakToPurohit}</p>
              <a href={telHref()} data-cta="menu" className="mt-3 block font-display text-4xl hover:text-marigold">
                {company.phoneDisplay}
              </a>
              <a
                href={enquiryHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="menu"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold"
              >
                <FaWhatsapp aria-hidden="true" /> {text.common.whatsappUs}
              </a>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-paper/75">
              <p className="eyebrow text-marigold">{text.header.meetFirst}</p>
              <p>{text.header.meetFirstText.replace('{meetingPoint}', text.meetingPointName)}</p>
              <p className="rounded-2xl border border-marigold/40 p-4 text-paper">{text.scamShort.replace('{phone}', company.phoneDisplay)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
