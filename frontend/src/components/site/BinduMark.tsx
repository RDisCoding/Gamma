/** Brand mark: a temple arch with the bindu (dot) at its heart — a nod to Bindu Sarovar. */
export default function BinduMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true" focusable="false">
      <path d="M3 39V17.5C3 9.5 8.8 3 16 3s13 6.5 13 14.5V39" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M9 39V19.5C9 15 12.1 11.5 16 11.5s7 3.5 7 8V39" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <circle cx="16" cy="24" r="3.4" fill="var(--color-sindoor)" />
    </svg>
  );
}
