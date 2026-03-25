import { useNavigate } from "react-router-dom";

import amberImg from "../../assets/images/AMBER.png";
import amberFloralImg from "../../assets/images/AMBERFLORAL.png";
import amberFougereImg from "../../assets/images/AMBERFOUGERE.png";
import amberFruityImg from "../../assets/images/AMBERFRUITY.png";
import amberSpicyImg from "../../assets/images/AMBERSPICY.png";

export default function ExploreByFragranceFamily() {
  const navigate = useNavigate();

  const families = [
    { title: "AMBER", image: amberImg },
    { title: "AMBER FLORAL", image: amberFloralImg },
    { title: "AMBER FOUGERE", image: amberFougereImg },
    { title: "AMBER FRUITY", image: amberFruityImg },
    { title: "AMBER SPICY", image: amberSpicyImg },
  ];

  const collections = [
    "Inspired by Initio Parfums",
    "Inspired by Kilian",
    "Inspired by Jo Malone",
    "Inspired by Bond No. 9",
    "Inspired by Amouage",
    "Inspired by Versace",
    "Inspired by Creed",
  ];

  return (
    <section className="bg-[#FFE8EB] pt-6 pb-14">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        {/* TITLE */}
        <h2 className="text-[26px] md:text-[38px] font-serif text-[#2b1b1f] mb-6">
          Explore by Fragrance Family
        </h2>

        {/* FAMILY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 mb-10">
          {families.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/home-fragrance")}
              className="
                relative group
                rounded-xl md:rounded-[22px]
                overflow-hidden
                bg-[#2b1b1f]
                cursor-pointer
              "
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full 
                  h-[140px] md:h-[300px]
                  object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* TITLE */}
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
                <p className="text-white text-[10px] md:text-sm tracking-widest font-semibold">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* COLLECTIONS */}
        <div className="mb-4">
          <h3 className="text-[18px] md:text-[22px] font-serif text-[#2b1b1f] mb-4 md:mb-6">
            Explore by Iconic Collections
          </h3>

          {/* MOBILE → SCROLL | DESKTOP → WRAP */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto md:flex-wrap pb-2">
            {collections.map((item, index) => (
              <span
                key={index}
                className="
                  whitespace-nowrap
                  px-3 py-2
                  text-[11px] md:text-sm
                  rounded-full
                  bg-white
                  border border-[#FF76B9]/40
                  text-[#2b1b1f]
                  cursor-pointer
                  transition
                  hover:bg-[#FF76B9]
                  hover:text-white
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <p className="text-[10px] md:text-[11px] text-[#6d4b53] mt-6 max-w-3xl leading-relaxed">
          Evah Perfume is not affiliated with the brands listed. Names are used
          solely for comparison to help customers understand fragrance
          inspiration. All trademarks belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
