import { useRef, useState, useEffect } from "react";

const features = [
  {
    title: "Made in California",
    desc: "Hand-blended in Orange County. California craftsmanship in every bottle.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: "1000+ Fragrances",
    desc: "5x more selection than other brands. Your perfect scent is here.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 17l-5 3 1.5-5.5L4 9l5.5-.5L12 3l2.5 5.5L20 9l-4.5 5.5L17 20z" />
      </svg>
    ),
  },
  {
    title: "Size Your Commitment",
    desc: "Try 5ml. Love it? Go bigger.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 4h6v16H4zM14 8h6v12h-6z" />
      </svg>
    ),
  },
  {
    title: "Oil + Spray",
    desc: "Choose your format.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="7" y="4" width="10" height="16" rx="2" />
        <path d="M12 4V2" />
      </svg>
    ),
  },
  {
    title: "Gift-Ready",
    desc: "Luxury gifting options available.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8v13M3 12h18" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FFE8EB] pt-5 py-14 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* TEXT */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs tracking-[0.35em] text-[#FF76B9] mb-4">
            EVAH PERFUME
          </p>

          <h2 className="text-[42px] font-serif text-[#2b1b1f] mb-4">
            Why Choose EvaH Perfume?
          </h2>

          <p className="text-[#6d4b53]">
            25 years of expertise. 5x more selection.
          </p>
        </div>

        {/* 🔥 WRAPPER (important) */}
        <div className="relative">
          {/* LEFT BUTTON */}
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="
                absolute -left-2 top-1/2 -translate-y-1/2 z-10
                px-4 py-2
                rounded-full
                bg-white/80 backdrop-blur-md
                border border-[#ffd1dc]
                shadow-md
                hover:bg-[#FF76B9] hover:text-white
                transition cursor-pointer
              "
            >
              ←
            </button>
          )}

          {/* RIGHT BUTTON */}
          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="
                absolute -right-2 top-1/2 -translate-y-1/2 z-10
                px-4 py-2
                rounded-full
                bg-white/80 backdrop-blur-md
                border border-[#ffd1dc]
                shadow-md
                hover:bg-[#FF76B9] hover:text-white
                transition cursor-pointer
              "
            >
              →
            </button>
          )}

          {/* CARDS (padding added 🔥) */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="
              flex gap-6 overflow-x-auto scroll-smooth no-scrollbar
              px-8
            "
          >
            {features.map((item, index) => (
              <div
                key={index}
                className="
                  min-w-[300px]
                  bg-[#FFF5F7]
                  border border-[#ffccd9]
                  rounded-2xl
                  p-8
                  transition
                  hover:shadow-xl hover:-translate-y-1
                "
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-6 text-[#FF76B9]">
                  {item.icon}
                </div>

                <h3 className="text-lg font-serif text-[#2b1b1f] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#6d4b53] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
