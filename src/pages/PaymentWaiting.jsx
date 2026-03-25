import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePost } from "../hooks/usePost";

import gpayImg from "../../src/assets/images/gpay.png";
import paytmImg from "../../src/assets/images/paytm.png";
import phonepeImg from "../../src/assets/images/phonepe.png";

export default function PaymentWaiting() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const { execute: confirmPaymentApi, loading } = usePost(
    `payment/confirm/${order?.id}`,
  );

  const [time, setTime] = useState(60);
  const [paymentFailed, setPaymentFailed] = useState(false);

  // redirect if order missing
  useEffect(() => {
    if (!order) {
      navigate("/checkout");
    }
  }, [order, navigate]);

  // timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // detect timeout
  useEffect(() => {
    if (time === 0) {
      setPaymentFailed(true);
    }
  }, [time]);

  const min = Math.floor(time / 60);
  const sec = time % 60;

  async function confirmPayment() {
    try {
      await confirmPaymentApi({});
      navigate("/order-success", { state: { order } });
    } catch {
      alert("Payment confirmation failed");
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-[#faf7f8] px-6">
        <div className="w-full max-w-[440px] bg-white border border-[#f3d2d9] rounded-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
          {/* STATUS */}
          <div className="flex items-center justify-center gap-2 text-[#FF76B9] text-sm mb-6">
            <span className="w-2 h-2 bg-[#FF76B9] rounded-full animate-pulse"></span>
            Waiting for payment confirmation
          </div>

          {/* TITLE */}
          <h1 className="text-[22px] font-semibold text-[#2b1b1f] text-center">
            Complete Payment
          </h1>

          <p className="text-xs text-[#8b6a72] text-center mt-1">
            Order #{order?.order_number}
          </p>

          {/* AMOUNT */}
          <div className="text-center text-[30px] font-semibold text-[#FF76B9] mt-5">
            ₹{order?.total}
          </div>

          {/* QR */}
          <div className="flex justify-center mt-6">
            <div className="p-4 border border-[#f3d2d9] rounded-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORDER-${order?.order_number}`}
                className="w-[200px] h-[200px]"
                alt="QR"
              />
            </div>
          </div>

          {/* TIMER */}
          <div className="text-center text-sm text-[#8b6a72] mt-4">
            Expires in{" "}
            <span
              className={`font-medium ${
                time <= 10 ? "text-red-500" : "text-[#2b1b1f]"
              }`}
            >
              {min}:{sec < 10 ? `0${sec}` : sec}
            </span>
          </div>

          {/* UPI APPS */}
          <div className="flex justify-center gap-5 mt-4 opacity-70">
            <img src={gpayImg} className="h-5" alt="gpay" />

            <img src={paytmImg} className="h-5" alt="paytm" />

            <img src={phonepeImg} className="h-5" alt="phonepe" />
          </div>

          {/* HELP */}
          <p className="text-xs text-[#8b6a72] text-center mt-3">
            Scan QR with any UPI app
          </p>

          {/* CONFIRM BUTTON */}
          <button
            onClick={confirmPayment}
            disabled={loading || paymentFailed}
            className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-[#FF76B9] to-[#ffa3cf] text-white text-sm shadow-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Confirming Payment..." : "I Have Paid"}
          </button>

          {/* CANCEL */}
          <button
            onClick={() => navigate("/checkout")}
            className="block w-full text-center text-sm text-[#8b6a72] mt-4 hover:text-[#FF76B9] transition"
          >
            Cancel and return to checkout
          </button>
        </div>
      </section>

      {/* PAYMENT FAILED POPUP */}
      {paymentFailed && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[360px] text-center shadow-xl">
            <h2 className="text-xl font-semibold text-red-500 mb-3">
              Payment Failed
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Payment time expired. Please retry checkout.
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-3 bg-[#FF76B9] text-white rounded-lg hover:bg-[#ff5aa9] transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </>
  );
}
