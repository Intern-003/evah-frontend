import { useState } from "react";
import { useGet } from "../../hooks/useGet";

export default function Dashboard() {
  const [topProducts] = useState([
    { name: "Ocean Breeze", sales: 120 },
    { name: "Royal Oud Attar", sales: 95 },
    { name: "Vanilla Dream", sales: 78 },
  ]);

  const { data, loading } = useGet("admin/dashboard");

  const stats = data?.data;

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-[#FF76B9]">
          <span className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <h1 className="text-3xl font-serif text-[#2b1b1f]">Dashboard</h1>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Revenue" value={`₹${stats?.revenue}`} />

        <Card title="Orders" value={stats?.orders} />

        <Card title="Customers" value={stats?.customers} />

        <Card title="Products" value={stats?.products} />
      </div>

      {/* SECOND ROW */}

      <div className="grid md:grid-cols-2 gap-6">
        {/* RECENT ORDERS */}

        <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-[0_15px_35px_rgba(228,163,177,0.18)]">
          <h2 className="text-lg font-semibold text-[#2b1b1f] mb-4">
            Recent Orders
          </h2>

          <div className="space-y-3">
            {stats?.recent_orders?.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-[#f3d2d9] pb-2"
              >
                <div>
                  <p className="text-sm font-medium text-[#2b1b1f]">
                    {order.id}
                  </p>

                  <p className="text-xs text-[#8b6a72]">{order.customer}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">{order.total}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full
                    ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "processing"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                    }
                    `}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-[0_15px_35px_rgba(228,163,177,0.18)]">
          <h2 className="text-lg font-semibold text-[#2b1b1f] mb-6">
            Top Products
          </h2>

          <div className="space-y-4">
            {(stats?.recent_orders || []).slice(0, 5).map((order, i) => {
              const percentage = 100 - i * 20;

              return (
                <div key={i} className="space-y-2">
                  {/* NAME + SALES */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2b1b1f] font-medium">
                      {order.customer}'s Order
                    </span>

                    <span className="text-[#FF76B9] font-semibold">
                      ₹{order.total}
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full h-2 bg-[#fde4ec] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF76B9] to-[#ff9ecf] rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {/* EMPTY STATE */}
            {!stats?.recent_orders?.length && (
              <p className="text-sm text-[#8b6a72] text-center py-6">
                No product insights yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* REVIEWS */}

      <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-[0_15px_35px_rgba(228,163,177,0.18)]">
        <h2 className="text-lg font-semibold text-[#2b1b1f] mb-4">
          Recent Reviews
        </h2>

        <div className="space-y-4">
          {stats?.recent_reviews?.map((review, i) => (
            <div key={i} className="border-b border-[#f3d2d9] pb-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-[#2b1b1f]">
                  {review.user}
                </span>

                <span className="text-yellow-500 text-sm">
                  {"★".repeat(review.rating)}
                </span>
              </div>

              <p className="text-sm text-[#6d4b53] mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      className="
      bg-white
      p-6
      rounded-2xl
      border border-[#f3d2d9]
      shadow-[0_15px_35px_rgba(228,163,177,0.18)]
      "
    >
      <p className="text-sm text-[#6d4b53]">{title}</p>

      <h3 className="text-2xl font-semibold text-[#FF76B9] mt-2">{value}</h3>
    </div>
  );
}
