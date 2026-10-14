import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'whatsapp' | 'ghost' | 'light' | 'ghost-light';

const variants: Record<Variant, string> = {
  primary: 'bg-sindoor text-paper hover:bg-sindoor-deep',
  whatsapp: 'bg-whatsapp text-paper hover:bg-[#17603c]',
  ghost: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  light: 'bg-paper text-ink hover:bg-marigold',
  'ghost-light': 'border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink',
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  /** Placement label for enquiry tracking, e.g. "hero" or "footer". */
  cta?: string;
  external?: boolean;
  className?: string;
}

/**
 * Pill-shaped call to action. The trailing arrow slides on hover; tel:,
 * wa.me and external links render as <a>, internal paths use next/link.
 */
export default function CtaLink({ href, children, variant = 'primary', icon, cta, external, className = '' }: Props) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight transition-[background-color,color,border-color] duration-500 ease-out-expo ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon && <span className="text-[1.05em]">{icon}</span>}
      <span>{children}</span>
      <span aria-hidden="true" className="relative inline-flex h-4 w-4 overflow-hidden">
        <span className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-full">→</span>
        <span className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0">→</span>
      </span>
    </>
  );

  const isNative = external || /^(tel:|mailto:|https?:)/.test(href);
  if (isNative) {
    const opensNewTab = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        data-cta={cta}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-cta={cta}>
      {content}
    </Link>
  );
}
