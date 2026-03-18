import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-25
        w-[48px] h-[48px]
        flex items-center justify-center
        text-white
        z-[200]
        cursor-pointer

        bg-gradient-to-br from-[#FF76B9] to-[#FF9FCC]

        shadow-[0_12px_35px_rgba(255,118,185,0.55)]
        hover:shadow-[0_18px_45px_rgba(255,118,185,0.75)]

        transition-all duration-500

        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }

        hover:scale-105
        active:scale-95

        rounded-[16px]
      `}
    >
      {/* Floating background glow */}

      <span
        className="
        absolute inset-0
        rounded-[16px]
        bg-gradient-to-br from-[#FF76B9] to-[#FF9FCC]
        blur-xl opacity-40
        animate-pulse
      "
      />

      {/* Icon */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
