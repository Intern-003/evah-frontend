export default function PageSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col mt-70">
      {/* 🌑 BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2a000a] via-[#6D0F24] to-[#140005]" />

      {/* ================= HERO ================= */}
      <div className="h-[70vh] flex items-end justify-center pb-24 relative overflow-hidden">
        {/* Shimmer */}
        <div className="absolute inset-0">
          <div
            className="absolute -left-[60%] top-0 h-full w-[40%]
            bg-gradient-to-r from-transparent via-white/10 to-transparent
            skew-x-[-20deg] animate-shimmer"
          />
        </div>

        {/* Button */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#ff5fa2]/30 to-[#ff86c8]/20 rounded-full" />

          <div
            className="
            px-12 py-4
            rounded-[999px_999px_18px_999px]
            border border-white/30
            bg-white/5 backdrop-blur-md
          "
          >
            <div className="h-3 w-28 bg-white/40 rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* ================= MARQUEE ================= */}
      <div className="py-6 px-6 overflow-hidden">
        <div className="flex gap-10 animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 w-36 bg-white/20 rounded-full" />
          ))}
        </div>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-44 rounded-xl bg-white/10 backdrop-blur-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
