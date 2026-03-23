import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePut } from "../hooks/usePut";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, refetch } = useGet(`orders/${id}`);
  const { executePut } = usePut();

  const order = data?.order;

  async function handleCancel() {
    try {
      await executePut(`orders/${order.id}/cancel`);
      toast.success("Order cancelled");
      refetch();
    } catch {
      toast.error("Cancel failed");
    }
  }

  const BASE_URL = import.meta.env.VITE_API_URL;

  const downloadInvoice = async () => {
    try {
      const res = await fetch(`${BASE_URL}orders/${order.id}/invoice`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${order.order_number}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const steps = [
    { label: "Order Placed", status: true },
    { label: "Payment Confirmed", status: true },
    { label: "Processing", status: true },
    { label: "Shipped", status: false },
    { label: "Delivered", status: false },
  ];

  if (loading) {
    return <OrderDetailsSkeleton />;
  }

  if (!order) {
    return (
      <div className="text-center py-40 text-red-500">Order not found</div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF6FA] py-16 px-6">
      <div className="max-w-[950px] mx-auto space-y-6">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-[#6d4b53] hover:text-[#FF76B9] transition"
        >
          ← Back
        </button>

        {/* HEADER */}
        <div className="bg-white rounded-3xl p-6 border border-[#f3d2d9] shadow-[0_15px_40px_rgba(255,118,185,0.12)]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-[#a07a83]">ORDER ID</p>
              <p className="font-semibold text-[#2b1b1f] text-lg">
                {order.order_number}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium capitalize
                ${
                  order.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : order.status === "processing"
                      ? "bg-blue-100 text-blue-600"
                      : order.status === "cancelled"
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-100 text-yellow-600"
                }
              `}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>{new Date(order.created_at).toLocaleString()}</span>

            <span className="text-xl font-semibold text-[#FF76B9]">
              ₹{order.total}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="mt-5 flex justify-between items-center flex-wrap gap-3">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={downloadInvoice}
                className="px-4 py-2 text-sm rounded-lg border border-[#f3d2d9] hover:bg-[#FFF1F6] transition cursor-pointer"
              >
                Download Invoice ?
              </button>
              <button
                onClick={() => navigate(`/reviews`)}
                className="px-4 py-2 text-sm rounded-lg border border-[#f3d2d9] hover:bg-[#FFF1F6] transition cursor-pointer"
              >
                Reviews ?
              </button>
            </div>

            {/* {order.status === "confirmed" && ( */}
            {["pending", "confirmed"].includes(order.status) && (
              <button
                // onClick={handleCancel}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this order?",
                    )
                  ) {
                    handleCancel();
                  }
                }}
                className="px-3 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* STATUS TIMELINE */}

        <div className="bg-white border border-[#f3d2d9] rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center">
            {steps.map((step, i) => {
              const isLastActive =
                step.status &&
                (i === steps.length - 1 || !steps[i + 1]?.status);

              return (
                <div key={i} className="flex-1 text-center relative">
                  {/* LINE */}
                  {i !== steps.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#f3d2d9] overflow-hidden">
                      {/* animated moving shine */}
                      {step.status && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF76B9] to-transparent animate-[move_1.5s_linear_infinite]" />
                      )}
                    </div>
                  )}

                  {/* CIRCLE */}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-medium
                    ${
                      step.status
                        ? "bg-[#FF76B9] text-white"
                        : "bg-[#f3d2d9] text-[#8b6a72]"
                    }
                    ${isLastActive ? "animate-pulse" : ""}
                  `}
                  >
                    ✓
                  </div>

                  {/* LABEL */}
                  <p className="text-xs mt-2 text-[#6d4b53]">{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER DETAILS */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* PRODUCTS */}

          <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm flex flex-col h-[470px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium mb-4 text-[#2b1b1f]">Order Items</h2>

              <span className="text-xs text-[#8b6a72]">
                {order.items.length} items
              </span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scroll">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.product?.id}`)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFF5F8] transition cursor-pointer"
                >
                  <img
                    src={item.product?.image_url}
                    className="w-16 h-16 object-contain bg-white rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-[#2b1b1f]">
                      {item.product?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-[#FF76B9]">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ORDER INFO */}

          <div className="space-y-6">
            {/* ADDRESS */}

            <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
              <h2 className="font-medium mb-2 text-[#2b1b1f]">
                Delivery Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#6d4b53]">
                <p>
                  <b>Name:</b> {order.name}
                </p>
                <p>
                  <b>Email:</b> {order.email}
                </p>
                <p>
                  <b>Phone:</b> {order.phone}
                </p>
              </div>
              <h2 className="font-medium mt-4 mb-0 text-[#2b1b1f]">
                Delivery Address
              </h2>

              <p className="text-sm mb-4 text-[#6d4b53]">{order?.address}</p>

              <div className="bg-[#fff7f9] border border-[#f3d2d9] rounded-xl p-3 text-sm">
                Estimated delivery: <b>3-5 days</b>
              </div>
            </div>

            {/* PAYMENT */}

            <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-[#2b1b1f]">
                Payment
              </h2>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8b6a72]">Method</span>
                <span className="text-green-600 font-medium">online</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8b6a72]">Status</span>
                <span className="text-green-600 font-medium">Paid</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#8b6a72]">Total</span>
                <span className="font-medium text-[#FF76B9]">
                  ₹{order?.total}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#FF76B9] to-[#ffa3cf] text-white rounded-2xl p-6 text-center">
          <p className="text-sm">Need help with your order?</p>

          <button
            onClick={() => navigate(`/contact-us`)}
            className="mt-3 px-4 py-2 bg-white text-[#FF76B9] rounded-lg text-sm cursor-pointer"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

function OrderDetailsSkeleton() {
  return (
    <section className="min-h-screen bg-[#FFF6FA] py-16 px-6 animate-pulse">
      <div className="max-w-[950px] mx-auto space-y-6">
        {/* BACK */}
        <div className="h-4 w-20 bg-[#f6dce4] rounded"></div>

        {/* HEADER */}
        <div className="bg-white rounded-3xl p-6 border border-[#f3d2d9] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="h-3 w-20 bg-[#f6dce4] rounded mb-2"></div>
              <div className="h-5 w-40 bg-[#efc6d4] rounded"></div>
            </div>

            <div className="h-6 w-20 bg-[#f6dce4] rounded-full"></div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="h-3 w-40 bg-[#f6dce4] rounded"></div>
            <div className="h-5 w-20 bg-[#FFB3D1]/70 rounded"></div>
          </div>

          {/* BUTTONS */}
          <div className="mt-5 flex gap-3">
            <div className="h-9 w-32 bg-[#f6dce4] rounded-lg"></div>
            <div className="h-9 w-24 bg-[#f6dce4] rounded-lg"></div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="bg-white border border-[#f3d2d9] rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-8 h-8 bg-[#f6dce4] rounded-full mx-auto mb-2"></div>
                <div className="h-3 w-16 bg-[#f6dce4] rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* ITEMS */}
          <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm h-[470px]">
            <div className="flex justify-between mb-4">
              <div className="h-4 w-28 bg-[#efc6d4] rounded"></div>
              <div className="h-3 w-12 bg-[#f6dce4] rounded"></div>
            </div>

            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#f6dce4] rounded-lg"></div>

                  <div className="flex-1">
                    <div className="h-3 w-32 bg-[#f6dce4] rounded mb-2"></div>
                    <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
                  </div>

                  <div className="h-4 w-12 bg-[#efc6d4] rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* ADDRESS */}
            <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
              <div className="h-4 w-40 bg-[#efc6d4] rounded mb-4"></div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="h-3 w-24 bg-[#f6dce4] rounded"></div>
                <div className="h-3 w-24 bg-[#f6dce4] rounded"></div>
                <div className="h-3 w-24 bg-[#f6dce4] rounded"></div>
              </div>

              <div className="h-3 w-full bg-[#f6dce4] rounded mb-3"></div>
              <div className="h-3 w-[80%] bg-[#f6dce4] rounded"></div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
              <div className="h-4 w-28 bg-[#efc6d4] rounded mb-4"></div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
                  <div className="h-3 w-16 bg-[#f6dce4] rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
                  <div className="h-3 w-16 bg-[#f6dce4] rounded"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
                  <div className="h-4 w-16 bg-[#FFB3D1]/70 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="bg-[#ffe3ee] rounded-2xl p-6">
          <div className="h-3 w-40 bg-[#f6dce4] rounded mx-auto mb-3"></div>
          <div className="h-8 w-32 bg-[#f6dce4] rounded mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
