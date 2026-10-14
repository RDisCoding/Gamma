const items = [
  { text: 'Matrugaya Pooja', className: 'font-display' },
  { text: 'मातृगया', className: 'font-deva' },
  { text: 'Matru Shraddha', className: 'font-display italic' },
  { text: 'માતૃ શ્રાદ્ધ', className: 'font-guj' },
  { text: 'Pind Daan', className: 'font-display' },
  { text: 'बिंदु सरोवर', className: 'font-deva' },
  { text: 'Tarpan', className: 'font-display italic' },
  { text: 'સિદ્ધપુર', className: 'font-guj' },
];

/** Endless ribbon of the rite's names in English, Hindi and Gujarati. Decorative only. */
export default function Marquee({ tone = 'sindoor' }: { tone?: 'sindoor' | 'paper' }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={`px-6 text-[clamp(2rem,5vw,4.25rem)] leading-none sm:px-10 ${item.className}`}>{item.text}</span>
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-marigold" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden py-8 sm:py-10 ${tone === 'sindoor' ? 'bg-sindoor text-paper' : 'bg-paper-2 text-ink'}`}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
