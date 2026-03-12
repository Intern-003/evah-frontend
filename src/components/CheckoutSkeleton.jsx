export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFF6FA] animate-pulse">
      <div className="max-w-[1000px] mx-auto grid grid-cols-[1fr_420px] gap-20 px-10 py-20">
        {/* LEFT SIDE FORM */}

        <div className="space-y-10">
          {/* LOGO */}
          <div className="flex justify-center">
            <div className="w-[130px] h-[30px] bg-[#f3d9e3] rounded"></div>
          </div>

          {/* EXPRESS CHECKOUT */}
          <div className="space-y-6">
            <div className="w-32 h-3 bg-[#f3d9e3] rounded mx-auto"></div>

            <div className="grid grid-cols-3 gap-3">
              <div className="h-10 rounded-lg bg-[#f3d9e3]"></div>
              <div className="h-10 rounded-lg bg-[#f3d9e3]"></div>
              <div className="h-10 rounded-lg bg-[#f3d9e3]"></div>
            </div>
          </div>

          {/* OR DIVIDER */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#f3d9e3]"></div>
            <div className="w-8 h-3 bg-[#f3d9e3] rounded"></div>
            <div className="flex-1 h-[1px] bg-[#f3d9e3]"></div>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <div className="w-24 h-4 bg-[#f3d9e3] rounded"></div>

            <div className="w-full h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="w-40 h-3 bg-[#f3d9e3] rounded"></div>
          </div>

          {/* DELIVERY */}
          <div className="space-y-4">
            <div className="w-24 h-4 bg-[#f3d9e3] rounded"></div>

            <div className="w-full h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 rounded-md bg-[#f3d9e3]"></div>
              <div className="h-12 rounded-md bg-[#f3d9e3]"></div>
            </div>

            <div className="h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="grid grid-cols-3 gap-4">
              <div className="h-12 rounded-md bg-[#f3d9e3]"></div>
              <div className="h-12 rounded-md bg-[#f3d9e3]"></div>
              <div className="h-12 rounded-md bg-[#f3d9e3]"></div>
            </div>

            <div className="h-12 rounded-md bg-[#f3d9e3]"></div>
          </div>

          {/* SHIPPING */}
          <div className="space-y-4">
            <div className="w-32 h-4 bg-[#f3d9e3] rounded"></div>
            <div className="h-14 rounded-md bg-[#f3d9e3]"></div>
          </div>

          {/* PAYMENT */}
          <div className="space-y-4">
            <div className="w-24 h-4 bg-[#f3d9e3] rounded"></div>

            <div className="h-16 rounded-xl bg-[#f3d9e3]"></div>

            <div className="h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="h-12 rounded-md bg-[#f3d9e3]"></div>

            <div className="h-14 rounded-xl bg-[#f3d9e3]"></div>
          </div>
        </div>

        {/* RIGHT ORDER SUMMARY */}

        <div className="bg-[#FBE9F1] p-8 rounded-2xl space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="w-[60px] h-[70px] bg-[#f3d9e3] rounded-lg"></div>

              <div className="flex-1 space-y-2">
                <div className="w-32 h-3 bg-[#f3d9e3] rounded"></div>
                <div className="w-20 h-3 bg-[#f3d9e3] rounded"></div>
              </div>

              <div className="w-12 h-3 bg-[#f3d9e3] rounded"></div>
            </div>
          ))}

          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-[#f3d9e3] rounded-md"></div>
            <div className="w-20 h-12 bg-[#f3d9e3] rounded-md"></div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="w-24 h-3 bg-[#f3d9e3] rounded"></div>
              <div className="w-12 h-3 bg-[#f3d9e3] rounded"></div>
            </div>

            <div className="flex justify-between">
              <div className="w-20 h-3 bg-[#f3d9e3] rounded"></div>
              <div className="w-20 h-3 bg-[#f3d9e3] rounded"></div>
            </div>

            <div className="flex justify-between">
              <div className="w-16 h-4 bg-[#f3d9e3] rounded"></div>
              <div className="w-16 h-4 bg-[#f3d9e3] rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
