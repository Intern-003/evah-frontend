import { useNavigate } from "react-router-dom";

export default function ExploreByFragranceFamily() {
  const navigate = useNavigate();

  const families = [
    {
      title: "AMBER",
      image: "../src/assets/images/AMBER.png",
    },
    {
      title: "AMBER FLORAL",
      image: "../src/assets/images/AMBERFLORAL.png",
    },
    {
      title: "AMBER FOUGERE",
      image: "../src/assets/images/AMBERFOUGERE.png",
    },
    {
      title: "AMBER FRUITY",
      image: "../src/assets/images/AMBERFRUITY.png",
    },
    {
      title: "AMBER SPICY",
      image: "../src/assets/images/AMBERSPICY.png",
    },
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
    <section className="bg-[#FFE8EB] pt-4 pb-16">
      <div className="max-w-[1320px] mx-auto px-8">
        {/* SECTION TITLE */}
        <h2 className="text-[38px] font-serif text-[#2b1b1f] mb-6">
          Explore by Fragrance Family
        </h2>

        {/* FAMILY CARDS */}
        <div className="grid md:grid-cols-5 gap-6 mb-9">
          {families.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/home-fragrance")}
              className="
                relative group
                rounded-[22px]
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
                  w-full h-[300px]
                  object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/35" />

              {/* TITLE */}
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm tracking-widest font-semibold">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ICONIC COLLECTIONS */}
        <div className="mb-4">
          <h3 className="text-[22px] font-serif text-[#2b1b1f] mb-6">
            Explore by Iconic Collections
          </h3>

          <div className="flex flex-wrap gap-4">
            {collections.map((item, index) => (
              <span
                key={index}
                className="
                  px-2 py-2
                  text-sm
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
        <p className="text-[11px] text-[#6d4b53] mt-6 max-w-3xl">
          Evah Perfume is not affiliated with the brands listed. Names are used
          solely for comparison to help customers understand fragrance
          inspiration. All trademarks belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
