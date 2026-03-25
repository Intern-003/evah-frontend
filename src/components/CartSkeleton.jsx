export default function CartSkeleton() {
  return (
    <section className="mt-24 md:mt-32 pb-20 md:pb-32 bg-gradient-to-b from-[#FFF7F9] to-white min-h-screen animate-pulse">
      {/* HEADER */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-6 mb-10 md:mb-16 text-center pt-10 md:pt-20">
        <div className="w-24 md:w-32 h-3 bg-[#f3d9e3] rounded mx-auto mb-3"></div>
        <div className="w-40 md:w-56 h-8 md:h-10 bg-[#f3d9e3] rounded mx-auto"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 md:gap-14">
        {/* LEFT ITEMS */}
        <div className="space-y-6 md:space-y-10">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="
                flex flex-col md:flex-row gap-4 md:gap-6
                bg-white
                p-4 md:p-6
                rounded-2xl md:rounded-[32px]
                border border-[#f3d2d9]
                shadow-sm md:shadow-[0_20px_60px_rgba(228,163,177,0.15)]
              "
            >
              {/* IMAGE */}
              <div className="w-full md:w-[120px] h-[120px] bg-[#f3d9e3] rounded-xl mx-auto"></div>

              {/* TEXT */}
              <div className="flex-1 space-y-2 md:space-y-3 text-center md:text-left">
                <div className="w-40 md:w-48 h-3 md:h-4 bg-[#f3d9e3] rounded mx-auto md:mx-0"></div>

                <div className="w-24 md:w-28 h-2 md:h-3 bg-[#f3d9e3] rounded mx-auto md:mx-0"></div>

                <div className="w-16 md:w-20 h-3 md:h-4 bg-[#f3d9e3] rounded mx-auto md:mx-0"></div>

                {/* QTY */}
                <div className="w-24 md:w-28 h-8 bg-[#f3d9e3] rounded-full mt-3 mx-auto md:mx-0"></div>
              </div>

              {/* PRICE */}
              <div className="w-16 h-4 bg-[#f3d9e3] rounded mx-auto md:mx-0 md:self-center"></div>
            </div>
          ))}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="lg:sticky lg:top-40 h-fit">
          <div
            className="
              bg-white
              p-5 md:p-8
              rounded-2xl md:rounded-[32px]
              border border-[#f3d2d9]
              shadow-sm md:shadow-[0_20px_60px_rgba(228,163,177,0.15)]
              space-y-5 md:space-y-6
            "
          >
            <div className="w-32 md:w-40 h-3 md:h-4 bg-[#f3d9e3] rounded"></div>

            <div className="flex gap-2">
              <div className="flex-1 h-9 md:h-10 bg-[#f3d9e3] rounded-full"></div>
              <div className="w-16 md:w-20 h-9 md:h-10 bg-[#f3d9e3] rounded-full"></div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between">
                <div className="w-16 md:w-20 h-2 md:h-3 bg-[#f3d9e3] rounded"></div>
                <div className="w-12 md:w-16 h-2 md:h-3 bg-[#f3d9e3] rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="w-14 md:w-16 h-2 md:h-3 bg-[#f3d9e3] rounded"></div>
                <div className="w-12 md:w-16 h-2 md:h-3 bg-[#f3d9e3] rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="w-16 md:w-20 h-3 md:h-4 bg-[#f3d9e3] rounded"></div>
                <div className="w-16 md:w-20 h-3 md:h-4 bg-[#f3d9e3] rounded"></div>
              </div>
            </div>

            <div className="w-full h-10 md:h-12 bg-[#f3d9e3] rounded-full"></div>

            <div className="w-full h-9 md:h-10 bg-[#f3d9e3] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
