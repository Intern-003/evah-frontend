import heroVideo from "../../assets/videos/hero.mp4";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* CTA Button */}
      <div className="relative z-10 flex h-full items-end justify-center pb-24">
        <button
          onClick={() => navigate("/shop-all")}
          className="
            relative overflow-hidden
            px-12 py-4
            font-semibold text-white text-[13px]
            tracking-[0.35em]

            bg-transparent
            rounded-[999px_999px_18px_999px]

            border border-white

            transition-all duration-300 ease-out

            hover:bg-[linear-gradient(135deg,#ff5fa2,#ff86c8)]
            hover:shadow-[0_18px_45px_rgba(255,105,180,0.45),inset_0_1px_0_rgba(255,255,255,0.4)]

            before:content-['']
            before:absolute
            before:top-0
            before:left-[-120%]
            before:w-[60%]
            before:h-full
            before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)]
            before:skew-x-[-25deg]
            before:transition-all
            before:duration-700
            hover:before:left-[130%]

            cursor-pointer
        "
        >
          <span className="relative z-10">BUY NOW</span>
        </button>
      </div>
    </section>
  );
}
