/** Circular text seal that turns slowly — decorative. */
export default function RotatingSeal({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full motion-safe:animate-[spin_28s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current text-[15px] font-semibold uppercase tracking-[0.32em]" style={{ fontFamily: 'var(--font-sans)' }}>
          <textPath href="#seal-circle">Matru Gaya · Bindu Sarovar · Siddhpur ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto block h-5 w-5 rounded-full bg-sindoor" />
    </div>
  );
}
