'use client';

import { useEffect, useState } from 'react';

/** Sticky table of contents that highlights the section being read. */
export default function Toc({ items, label }: { items: readonly { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="text-sm">
      <p className="eyebrow text-sindoor">{label}</p>
      <ol className="mt-5 space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`-ml-px block border-l py-1.5 pl-4 transition-colors duration-300 ${
                active === item.id ? 'border-sindoor font-semibold text-ink' : 'border-transparent text-ink-mute hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
