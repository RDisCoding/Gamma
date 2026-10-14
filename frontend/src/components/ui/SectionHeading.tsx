import type { ReactNode } from 'react';

interface Props {
  index?: string;
  eyebrow: string;
  title: ReactNode[];
  intro?: ReactNode;
  tone?: 'dark' | 'light';
  as?: 'h2' | 'h3';
  className?: string;
  /** id for the heading, so the section can use aria-labelledby. */
  id?: string;
}

/** Numbered section label + serif heading whose lines rise into view. */
export default function SectionHeading({ index, eyebrow, title, intro, tone = 'dark', as = 'h2', className = '', id }: Props) {
  const Tag = as;
  return (
    <div className={className}>
      <p className={`eyebrow flex items-center gap-4 ${tone === 'light' ? 'text-marigold' : 'text-sindoor'}`} data-reveal>
        {index && <span className="tabular-nums">{index}</span>}
        {index && <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />}
        <span>{eyebrow}</span>
      </p>
      <Tag id={id} className={`display-md mt-6 max-w-[22ch] ${tone === 'light' ? 'text-paper' : 'text-ink'}`} data-reveal-lines>
        {title.map((line, i) => (
          <span key={i} className="line-mask">
            <span style={{ ['--d' as string]: i }}>{line}</span>{' '}
          </span>
        ))}
      </Tag>
      {intro && (
        <div
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${tone === 'light' ? 'text-paper/70' : 'text-ink-soft'}`}
          data-reveal
          style={{ ['--d' as string]: 2 }}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
