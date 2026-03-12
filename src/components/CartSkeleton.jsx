export default function CartSkeleton() {
  return (
    <section className="mt-32 pb-32 bg-gradient-to-b from-[#FFF7F9] to-white min-h-screen animate-pulse">
      {/* HEADER */}
      <div className="max-w-[1300px] mx-auto px-6 mb-16 text-center pt-20">
        <div className="w-32 h-3 bg-[#f3d9e3] rounded mx-auto mb-4"></div>
        <div className="w-56 h-10 bg-[#f3d9e3] rounded mx-auto"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-[1.6fr_1fr] gap-14">
        {/* LEFT ITEMS */}

        <div className="space-y-10">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="
              flex gap-6
              bg-white
              p-6
              rounded-[32px]
              border border-[#f3d2d9]
              shadow-[0_20px_60px_rgba(228,163,177,0.15)]
              "
            >
              {/* IMAGE */}
              <div className="w-[120px] h-[120px] bg-[#f3d9e3] rounded-xl"></div>

              {/* TEXT */}
              <div className="flex-1 space-y-3">
                <div className="w-48 h-4 bg-[#f3d9e3] rounded"></div>

                <div className="w-28 h-3 bg-[#f3d9e3] rounded"></div>

                <div className="w-20 h-4 bg-[#f3d9e3] rounded"></div>

                {/* QTY */}
                <div className="w-28 h-8 bg-[#f3d9e3] rounded-full mt-4"></div>
              </div>

              {/* PRICE */}
              <div className="w-16 h-4 bg-[#f3d9e3] rounded self-center"></div>
            </div>
          ))}
        </div>

        {/* RIGHT SUMMARY */}

        <div className="sticky top-50 h-fit">
          <div
            className="
            bg-white
            p-8
            rounded-[32px]
            border border-[#f3d2d9]
            shadow-[0_20px_60px_rgba(228,163,177,0.15)]
            space-y-6
            "
          >
            <div className="w-40 h-4 bg-[#f3d9e3] rounded"></div>

            <div className="flex gap-2">
              <div className="flex-1 h-10 bg-[#f3d9e3] rounded-full"></div>
              <div className="w-20 h-10 bg-[#f3d9e3] rounded-full"></div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="w-20 h-3 bg-[#f3d9e3] rounded"></div>
                <div className="w-16 h-3 bg-[#f3d9e3] rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="w-16 h-3 bg-[#f3d9e3] rounded"></div>
                <div className="w-16 h-3 bg-[#f3d9e3] rounded"></div>
              </div>

              <div className="flex justify-between">
                <div className="w-20 h-4 bg-[#f3d9e3] rounded"></div>
                <div className="w-20 h-4 bg-[#f3d9e3] rounded"></div>
              </div>
            </div>

            <div className="w-full h-12 bg-[#f3d9e3] rounded-full"></div>

            <div className="w-full h-10 bg-[#f3d9e3] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
