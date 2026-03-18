import { useNavigate, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#faf7f8] px-6">
      <div className="w-full max-w-[520px] bg-white border border-[#f3d2d9] rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
        {/* SUCCESS ICON */}

        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-[#FF76B9]/15 animate-ping"></div>

            <div className="w-16 h-16 rounded-full bg-[#FF76B9] flex items-center justify-center text-white text-2xl shadow-lg">
              ✓
            </div>
          </div>
        </div>

        {/* TITLE */}

        <h1 className="text-center text-[28px] font-semibold text-[#2b1b1f]">
          Order Confirmed
        </h1>

        <p className="text-center text-sm text-[#8b6a72] mt-2">
          Your order has been placed successfully
        </p>

        {/* ORDER INFO */}

        <div className="mt-8 border border-[#f3d2d9] rounded-xl p-6 bg-[#fff9fb]">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-[#8b6a72]">Order ID</span>

            <span className="font-medium text-[#2b1b1f]">
              #{order?.order_number}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-3">
            <span className="text-[#8b6a72]">Amount Paid</span>

            <span className="font-medium text-[#FF76B9]">₹{order?.total}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#8b6a72]">Payment Status</span>

            <span className="text-green-600 font-medium">Paid</span>
          </div>
        </div>

        {/* DELIVERY MESSAGE */}

        <div className="mt-6 text-center text-sm text-[#6d4b53] leading-relaxed">
          Your order is being processed and will be shipped soon. You will
          receive a confirmation email shortly.
        </div>

        {/* BUTTONS */}

        <div className="flex gap-4 mt-8">
          {/* CONTINUE SHOPPING */}

          <button
            onClick={() => navigate("/shop-all")}
            className="flex-1 py-3 border border-[#FF76B9] text-[#FF76B9] rounded-xl text-sm hover:bg-[#FF76B9] hover:text-white transition"
          >
            Continue Shopping
          </button>

          {/* TRACK ORDER */}

          <button
            onClick={() => navigate("/track-order")}
            className="flex-1 py-3 bg-gradient-to-r from-[#FF76B9] to-[#ff9fcc] text-white rounded-xl text-sm shadow-md hover:opacity-90 transition"
          >
            Track Order
          </button>
        </div>

        {/* FOOTER */}

        <p className="text-center text-xs text-[#8b6a72] mt-6">
          Need help? Contact our support anytime.
        </p>
      </div>
    </section>
  );
}
