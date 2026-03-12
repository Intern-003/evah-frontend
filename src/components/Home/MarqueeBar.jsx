const items = [
  "25+ Years of Artisan Craft",
  "1M+ Bottles Sold",
  "A Library of Signature Scents",
  "Vegan & Cruelty-Free",
  "IFRA-Compliant",
  "Handcrafted in California",
];

export default function MarqueeBar() {
  return (
    <section className="w-full overflow-hidden bg-[#fff7f8] border-t border-b border-black/5">
      <div className="relative flex whitespace-nowrap group">
        {/* Track */}
        <div className="flex animate-marquee items-center py-4 group-hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center px-10 text-[13px] tracking-[0.12em] font-medium text-[#4a2c34]"
            >
              <span>{item}</span>
              <span className="mx-6 text-[#a7737e] opacity-70">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
