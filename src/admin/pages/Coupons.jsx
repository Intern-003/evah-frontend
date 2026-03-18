import { useState } from "react";

export default function Coupons() {
  /* ================= DEMO DATA ================= */

  const [coupons] = useState([
    {
      id: 1,
      code: "WELCOME10",
      discount: 10,
      type: "Percentage",
      usage: 24,
      limit: 100,
      expiry: "30 Apr 2026",
      status: "Active",
    },
    {
      id: 2,
      code: "EVAH20",
      discount: 20,
      type: "Percentage",
      usage: 56,
      limit: 200,
      expiry: "15 May 2026",
      status: "Active",
    },
    {
      id: 3,
      code: "FRAGRANCE200",
      discount: 200,
      type: "Flat",
      usage: 18,
      limit: 50,
      expiry: "10 Mar 2026",
      status: "Expired",
    },
    {
      id: 4,
      code: "SUMMER15",
      discount: 15,
      type: "Percentage",
      usage: 9,
      limit: 100,
      expiry: "25 Jun 2026",
      status: "Active",
    },
  ]);

  /* ================= ANALYTICS ================= */

  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter((c) => c.status === "Active").length;

  const expiredCoupons = coupons.filter((c) => c.status === "Expired").length;

  const totalUsage = coupons.reduce((sum, c) => sum + c.usage, 0);

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-serif text-[#2b1b1f]">Coupons Overview</h1>

        <p className="text-sm text-[#8b6a72] mt-1">
          Monitor discount coupons and usage.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-6">
        {/* TOTAL */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">
            TOTAL COUPONS
          </p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {totalCoupons}
          </h2>
        </div>

        {/* ACTIVE */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">
            ACTIVE COUPONS
          </p>

          <h2 className="text-3xl font-semibold text-green-600 mt-2">
            {activeCoupons}
          </h2>
        </div>

        {/* EXPIRED */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">EXPIRED</p>

          <h2 className="text-3xl font-semibold text-red-500 mt-2">
            {expiredCoupons}
          </h2>
        </div>

        {/* USAGE */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">TOTAL USAGE</p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {totalUsage}
          </h2>
        </div>
      </div>

      {/* COUPONS TABLE */}

      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="bg-[#fff1f4] px-5 py-3 text-xs tracking-widest text-[#2b1b1f]">
          COUPONS LIST
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white border-b border-[#f3d2d9]">
              <tr>
                <th className="px-5 py-3 text-left">Code</th>
                <th className="px-5 py-3 text-left">Discount</th>
                <th className="px-5 py-3 text-left">Usage</th>
                <th className="px-5 py-3 text-left">Limit</th>
                <th className="px-5 py-3 text-left">Expiry</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-t border-[#f3d2d9]">
                  {/* CODE */}

                  <td className="px-5 py-3">
                    <span className="px-3 py-1 rounded-full bg-[#ffe6ef] text-[#FF76B9] font-medium text-xs">
                      {coupon.code}
                    </span>
                  </td>

                  {/* DISCOUNT */}

                  <td className="px-5 py-3">
                    {coupon.type === "Percentage"
                      ? `${coupon.discount}%`
                      : `₹${coupon.discount}`}
                  </td>

                  {/* USAGE */}

                  <td className="px-5 py-3">{coupon.usage}</td>

                  {/* LIMIT */}

                  <td className="px-5 py-3">{coupon.limit}</td>

                  {/* EXPIRY */}

                  <td className="px-5 py-3 text-[#8b6a72]">{coupon.expiry}</td>

                  {/* STATUS */}

                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full
                      ${
                        coupon.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }
                      `}
                    >
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTICE */}

      <div className="bg-[#fff7f9] border border-[#f3d2d9] rounded-xl p-5 text-sm text-[#6d4b53]">
        <span className="font-medium text-[#2b1b1f]">Coupons Notice</span>

        <p className="mt-1">
          Coupons API integration will be implemented soon. This page currently
          displays demo coupon data.
        </p>
      </div>
    </div>
  );
}
