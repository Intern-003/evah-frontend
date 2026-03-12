import { useNavigate } from "react-router-dom";

export default function GiftableByDesign() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FFE8EB] py-16 pt-4">
      <div className="max-w-[1320px] mx-auto px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT IMAGE */}
          <div className="relative rounded-[26px] overflow-hidden bg-[#f6dbe2]">
            <img
              src="../src/assets/images/gifting.jpeg"
              alt="Giftable by Design"
              className="w-full h-[480px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#FF76B9]/20 via-transparent to-transparent" />

            <p className="absolute bottom-3 left-5 text-[11px] text-white/80">
              Premium box + keepsake bottle — ready to gift on arrival.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* EYEBROW */}
            <p className="text-[11px] tracking-[0.35em] text-[#FF76B9] mb-3">
              EVAH • GIFTING
            </p>

            {/* TITLE */}
            <h2 className="text-[36px] font-serif text-[#2b1b1f] leading-tight mb-4">
              Giftable by Design
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm text-[#6d4b53] leading-relaxed mb-8 max-w-lg">
              Premium presentation, crafted with care, and made to feel
              personal. A gift that looks expensive — because the details are.
            </p>

            {/* FEATURE CARDS */}
            <div className="space-y-3 mb-8">
              {[
                {
                  title: "Premium Presentation",
                  desc: "Sturdy box. Clean design. No extra wrapping needed.",
                },
                {
                  title: "Human-Safe Transparency",
                  desc: "Ingredient-forward standards you can actually read.",
                },
                {
                  title: "Crafted with Care",
                  desc: "Small-batch attention with fast processing available.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    bg-white
                    border border-[#f3c6d4]
                    rounded-xl
                    p-4
                    flex gap-3
                  "
                >
                  <span
                    className="
                      w-9 h-9
                      rounded-full
                      border border-[#FF76B9]
                      flex items-center justify-center
                      text-[#FF76B9]
                      text-xs
                      flex-shrink-0
                    "
                  >
                    ✓
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#2b1b1f]">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-[#6d4b53] mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "Made in California",
                "Vegan & Cruelty-Free",
                "IFRA Compliant",
                "Same-Day Processing",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="
                    px-3 py-1.5
                    text-[11px]
                    rounded-full
                    border border-[#FF76B9]/40
                    text-[#2b1b1f]
                    bg-white
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate("/gifts")}
                className="
                  px-4 py-3
                  rounded-full
                  border border-[#FF76B9]
                  text-[#FF76B9]
                  text-sm
                  font-medium
                  tracking-wide
                  transition-all duration-300
                  hover:bg-[#FF76B9]
                  hover:text-white
                  cursor-pointer
                "
              >
                Find Perfect Gifts
              </button>

              <button
                onClick={() => navigate("/shop-all")}
                className="cursor-pointer text-sm text-[#2b1b1f] border-b border-[#2b1b1f]/40 hover:opacity-70 transition"
              >
                Explore all fragrances →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
