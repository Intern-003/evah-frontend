import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { usePut } from "../../hooks/usePut";

export default function Orders() {
  const { data, loading, error } = useGet("admin/orders");

  const { executePut: updateStatusApi } = usePut();

  const { data: orderDetailData, refetch: fetchOrderDetail } = useGet(null);

  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data?.orders) setOrders(data.orders);
  }, [data]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;

  async function handleStatusChange(id, status) {
    try {
      await updateStatusApi(`admin/orders/${id}/status`, { status });

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    } catch {
      alert("Failed");
    }
  }

  async function handleView(orderId) {
    try {
      const res = await fetchOrderDetail(`admin/orders/${orderId}`);

      setSelectedOrder(res.order);
      setOpenModal(true);
    } catch {
      alert("Failed to fetch order");
    }
  }

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-[#FF76B9]">
          <span className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm">Loading ...</span>
        </div>
      </div>
    );
  }
  if (error) return <div className="p-10 text-red-500">Error</div>;

  return (
    <>
      {" "}
      <div className="space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-[#2b1b1f]">
            Orders Dashboard
          </h1>
          <p className="text-sm text-[#8b6a72] mt-1">
            Track orders, revenue & customer activity
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Total Orders" value={totalOrders} />
          <StatCard title="Revenue" value={`₹${totalRevenue}`} highlight />
          <StatCard title="Pending" value={pendingOrders} />
          <StatCard title="Confirmed" value={confirmedOrders} />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-[#f3d2d9] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b text-sm font-medium text-[#2b1b1f]">
            Recent Orders
          </div>

          <div className="max-h-[520px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#fff7fa] text-xs uppercase text-[#8b6a72]">
                <tr>
                  <th className="px-6 py-3 text-left">Order</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">View</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-[#fff9fb] transition"
                  >
                    {/* ORDER */}
                    <td className="px-6 py-4 font-medium text-[#2b1b1f]">
                      #{order.order_number}
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-xs text-[#8b6a72]">{order.email}</p>
                      </div>
                    </td>

                    {/* AMOUNT */}
                    <td className="px-6 py-4 font-semibold text-[#FF76B9]">
                      ₹{order.total}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 text-[#8b6a72]">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    {/* product details */}
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleView(order.id)}
                        className="text-xs px-3 py-1 bg-[#FF76B9] text-white rounded-md hover:opacity-90 cursor-pointer"
                      >
                        View
                      </button>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="
                        border border-[#f3d2d9]
                        rounded-lg
                        px-3
                        py-1.5
                        text-xs
                        focus:ring-1
                        focus:ring-[#FF76B9]
                        outline-none
                      "
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.15)] border border-[#f3d2d9] p-8">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#2b1b1f]">
                  Order #{selectedOrder.order_number}
                </h2>

                <p className="text-xs text-[#8b6a72] mt-1">
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="text-[#8b6a72] hover:text-black text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* STATUS + TOTAL */}
            <div className="flex justify-between items-center mb-6">
              <StatusBadge status={selectedOrder.status} />

              <div className="text-xl font-semibold text-[#FF76B9]">
                ₹{selectedOrder.total}
              </div>
            </div>

            {/* USER INFO */}
            <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
              <div>
                <p className="text-[#8b6a72] text-xs mb-1">Customer</p>
                <p className="font-medium text-[#2b1b1f]">
                  {selectedOrder.name}
                </p>
                <p className="text-xs text-[#8b6a72]">{selectedOrder.email}</p>
                <p className="text-xs text-[#8b6a72]">{selectedOrder.phone}</p>
              </div>

              <div>
                <p className="text-[#8b6a72] text-xs mb-1">Delivery Address</p>
                <p className="text-[#2b1b1f] text-sm leading-relaxed">
                  {selectedOrder.address}
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div>
              <h3 className="text-sm font-medium text-[#2b1b1f] mb-4">
                Order Items
              </h3>

              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center border border-[#f3d2d9] rounded-xl p-4 hover:bg-[#fff9fb] transition"
                  >
                    {/* IMAGE */}
                    <img
                      // src={item.product.image_url}
                      src={item.product.image_url.replace(
                        "/evah_backend/storage",
                        "/evah_backend/public/storage",
                      )}
                      className="w-14 h-14 object-contain bg-white border rounded-lg p-1"
                    />

                    {/* INFO */}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#2b1b1f]">
                        {item.product.name}
                      </p>

                      <div className="flex gap-3 mt-1 text-xs text-[#8b6a72]">
                        <span>Qty: {item.quantity}</span>
                        <span>•</span>
                        <span>{item.product.type}</span>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="text-sm font-semibold text-[#FF76B9]">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-8 border-t pt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="text-sm text-[#8b6a72] hover:text-black transition"
              >
                Close
              </button>

              <div className="text-lg font-semibold text-[#2b1b1f]">
                Total:{" "}
                <span className="text-[#FF76B9]">₹{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, highlight }) {
  return (
    <div
      className={`
        rounded-2xl p-6 border
        ${
          highlight
            ? "bg-gradient-to-br from-[#FF76B9] to-[#ffa3cf] text-white shadow-md"
            : "bg-white border-[#f3d2d9]"
        }
      `}
    >
      <p className={`text-xs ${highlight ? "opacity-80" : "text-[#8b6a72]"}`}>
        {title}
      </p>

      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {
  const styles = {
    confirmed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    cancelled: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
