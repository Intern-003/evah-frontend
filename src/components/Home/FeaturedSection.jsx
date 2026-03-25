import { useNavigate } from "react-router-dom";

import perfume1Img from "/src/assets/images/perfume1.png";
import perfume2Img from "/src/assets/images/perfume2.jpg";
import perfume3Img from "/src/assets/images/perfume3.jpg";

const products = [
  {
    id: 1,
    name: "Amber Rouge Saffron",
    subtitle: "Inspired by MFK's Baccarat Rouge 540",
    price: "₹4,092.53",
    image: perfume1Img,
  },
  {
    id: 2,
    name: "Mojave Ghost",
    subtitle: "Inspired by Byredo Mojave Ghost",
    price: "₹3,637.70",
    image: perfume2Img,
  },
  {
    id: 3,
    name: "Love Don't Be Shy",
    subtitle: "Inspired by Kilian's Love, Don't Be Shy",
    price: "₹3,910.60",
    image: perfume3Img,
  },
];

export default function FeaturedSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FFE8EB] py-24 pt-15">
      {/* Wider horizontal padding for premium spacing */}
      <div className="max-w-[1440px] mx-auto px-10 xl:px-16">
        {/* SECTION HEADER */}
        <div className="flex items-end justify-between mb-7">
          <h2 className="text-[30px] font-serif text-[#2b1b1f] leading-tight">
            Featured Perfumes Crafted in California
          </h2>

          <button
            onClick={() => navigate("/shop-all")}
            className="cursor-pointer text-[13px] tracking-wide border-b border-[#2b1b1f]/40 text-[#2b1b1f] hover:opacity-70 transition"
          >
            View all
          </button>
        </div>

        {/* CARDS GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                relative group
                rounded-[24px]
                overflow-hidden
                bg-[#2b1b1f]
                shadow-lg
              "
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="
                  w-full h-[520px]
                  object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />

              {/* CONTENT */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                {/* BADGE */}
                <span
                  className="
                  bg-white/20 backdrop-blur-md
                  px-4 py-1
                  text-xs
                  rounded-full
                  w-fit mb-4
                "
                >
                  Customer Favorite
                </span>

                {/* TITLE */}
                <h3 className="text-[21px] font-semibold tracking-wide uppercase">
                  {product.name}
                </h3>

                {/* SUBTITLE */}
                <p className="text-sm text-white/80 mt-1">{product.subtitle}</p>

                {/* CTA + PRICE */}
                <div className="flex items-center justify-between mt-7">
                  <button
                    onClick={() => navigate("/shop-all")}
                    className="
                      border border-white
                      px-6 py-2
                      text-[11px]
                      tracking-[0.3em]
                      transition-all duration-300
                      hover:bg-white hover:text-[#2b1b1f]
                      cursor-pointer
                    "
                  >
                    EXPLORE MORE
                  </button>

                  <span
                    className="
                    bg-[#2b1b1f]/80
                    px-4 py-1
                    rounded-full
                    text-sm
                  "
                  >
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
