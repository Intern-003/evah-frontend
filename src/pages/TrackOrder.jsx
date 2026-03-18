import { useLocation, useNavigate } from "react-router-dom";

export default function TrackOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  const steps = [
    { label: "Order Placed", status: true },
    { label: "Payment Confirmed", status: true },
    { label: "Processing", status: true },
    { label: "Shipped", status: false },
    { label: "Delivered", status: false },
  ];

  return (
    <section className="min-h-screen bg-[#faf7f8] py-14 px-6 flex justify-center">
      <div className="w-full max-w-[1000px] space-y-10">
        {/* HEADER */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[28px] font-semibold text-[#2b1b1f]">
              Track Your Order
            </h1>

            <p className="text-sm text-[#8b6a72]">
              Order #{order?.order_number}
            </p>
          </div>

          <button
            onClick={() => navigate("/shop-all")}
            className="text-sm text-[#FF76B9] hover:underline"
          >
            Continue Shopping
          </button>
        </div>

        {/* STATUS TIMELINE */}

        <div className="bg-white border border-[#f3d2d9] rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 text-center relative">
                {/* line */}

                {i !== steps.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#f3d2d9]"></div>
                )}

                {/* circle */}

                <div
                  className={`relative z-10 w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-medium
                  ${
                    step.status
                      ? "bg-[#FF76B9] text-white"
                      : "bg-[#f3d2d9] text-[#8b6a72]"
                  }`}
                >
                  ✓
                </div>

                <p className="text-xs mt-2 text-[#6d4b53]">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ORDER DETAILS */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* PRODUCTS */}

          <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-[#2b1b1f]">Items</h2>

            {order?.items?.map((item) => (
              <div key={item.id} className="flex gap-4 mb-4">
                <img
                  src={item.image}
                  className="w-16 h-16 object-contain border rounded-lg"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2b1b1f]">
                    {item.name}
                  </p>

                  <p className="text-xs text-[#8b6a72]">Qty: {item.quantity}</p>
                </div>

                <div className="text-sm font-medium text-[#FF76B9]">
                  ₹{item.price}
                </div>
              </div>
            ))}
          </div>

          {/* ORDER INFO */}

          <div className="space-y-6">
            {/* ADDRESS */}

            <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-[#2b1b1f]">
                Delivery Address
              </h2>

              <p className="text-sm text-[#6d4b53]">{order?.address}</p>
            </div>

            {/* PAYMENT */}

            <div className="bg-white border border-[#f3d2d9] rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-[#2b1b1f]">
                Payment
              </h2>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8b6a72]">Method</span>
                <span>{order?.payment_method}</span>
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
      </div>
    </section>
  );
}
