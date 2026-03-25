import { useNavigate } from "react-router-dom";

import womenImg from "../../assets/images/women.jpeg";
import menImg from "../../assets/images/men.jpeg";
import unisexImg from "../../assets/images/unisex.jpeg";

export default function ShopByGender() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "WOMEN",
      cta: "SHOP WOMEN",
      image: womenImg,
    },
    {
      title: "MEN",
      cta: "SHOP MEN",
      image: menImg,
    },
    {
      title: "UNISEX",
      cta: "SHOP UNISEX",
      image: unisexImg,
    },
  ];

  return (
    <section className="bg-[#FFE8EB] py-20 pt-5">
      <div className="max-w-[1320px] mx-auto px-8">
        {/* SECTION TITLE */}
        <h2 className="text-center text-[38px] font-serif text-[#2b1b1f] mb-7">
          Shop by Gender
        </h2>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-10">
          {categories.map((item, index) => (
            <div
              key={index}
              className="
                relative group
                rounded-[26px]
                overflow-hidden
                bg-[#2b1b1f]
                shadow-md
              "
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full h-[420px]
                  object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/35" />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-[30px] tracking-widest font-semibold mb-5">
                  {item.title}
                </h3>

                <button
                  onClick={() =>
                    navigate(`/shop-all?category=${item.title.toLowerCase()}`)
                  }
                  className="
                    px-7 py-2.5
                    bg-white
                    text-[#2b1b1f]
                    text-sm
                    font-medium
                    rounded-full
                    transition-all duration-300
                    hover:bg-[#FF76B9]
                    hover:text-white
                    cursor-pointer
                  "
                >
                  {item.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
