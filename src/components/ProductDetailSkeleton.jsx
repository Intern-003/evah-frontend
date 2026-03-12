export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-[1300px] mx-auto px-8 py-16 mt-55 animate-pulse">
      <div className="grid grid-cols-2 gap-16">
        {/* IMAGE SKELETON */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#fff1f6] to-[#fde4ed] p-10">
          <div className="w-full h-[500px] rounded-2xl bg-[#f7dce7]" />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col space-y-6">
          {/* CATEGORY */}
          <div className="w-20 h-3 bg-[#f2d6e0] rounded"></div>

          {/* TITLE */}
          <div className="space-y-3">
            <div className="w-64 h-8 bg-[#f2d6e0] rounded"></div>
            <div className="w-40 h-8 bg-[#f2d6e0] rounded"></div>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-3">
            <div className="w-24 h-4 bg-[#f2d6e0] rounded"></div>
            <div className="w-16 h-4 bg-[#f2d6e0] rounded"></div>
          </div>

          {/* DESCRIPTION */}
          <div className="w-72 h-4 bg-[#f2d6e0] rounded"></div>

          {/* PRICE */}
          <div className="flex items-center gap-6 mt-4">
            <div className="w-24 h-6 bg-[#f2d6e0] rounded"></div>
            <div className="w-28 h-8 bg-[#f2d6e0] rounded"></div>
            <div className="w-20 h-6 bg-[#e1f5e8] rounded-full"></div>
          </div>

          {/* SIZE SELECT */}
          <div className="space-y-4 mt-6">
            <div className="w-24 h-4 bg-[#f2d6e0] rounded"></div>

            <div className="flex gap-3">
              <div className="w-16 h-10 rounded-full bg-[#f2d6e0]"></div>
              <div className="w-16 h-10 rounded-full bg-[#f2d6e0]"></div>
              <div className="w-16 h-10 rounded-full bg-[#f2d6e0]"></div>
            </div>
          </div>

          {/* ADD TO CART AREA */}
          <div className="flex items-center gap-6 mt-6">
            {/* QTY */}
            <div className="w-32 h-12 rounded-full bg-[#f2d6e0]"></div>

            {/* ADD TO CART BUTTON */}
            <div className="w-48 h-12 rounded-full bg-[#f2d6e0]"></div>

            {/* WISHLIST */}
            <div className="w-12 h-12 rounded-full bg-[#f2d6e0]"></div>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-[#f2d6e0] mt-10"></div>

          {/* DESCRIPTION ACCORDION */}
          <div className="flex justify-between items-center">
            <div className="w-32 h-4 bg-[#f2d6e0] rounded"></div>
            <div className="w-4 h-4 bg-[#f2d6e0] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
