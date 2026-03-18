import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import CheckoutSkeleton from "../components/CheckoutSkeleton";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useGet("cart");
  const { execute: createOrder, loading: orderLoading } = usePost("orders");

  const [form, setForm] = useState({
    email: "",
    name: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [billingType, setBillingType] = useState("same");

  const cart =
    data?.cart_items?.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.sale_price ?? item.product.price,
      qty: item.quantity,
      image: item.product.image_url,
    })) || [];

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);

  if (loading) {
    return <CheckoutSkeleton />;
  }

  if (error) {
    return <div className="text-center py-40 text-red-500">{error}</div>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handlePay() {
    try {
      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.zip}`;

      const res = await createOrder({
        email: form.email,
        name: form.name,
        phone: form.phone,
        address: fullAddress,
      });

      navigate("/payment", {
        state: {
          order: res.order,
        },
      });
    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  }

  const inputStyle = `
  w-full
  rounded-xl
  px-4
  py-3
  text-sm
  bg-[#FFF9FB]
  border
  border-[#F4D6E2]
  outline-none
  transition
  duration-200
  focus:border-[#FF76B9]
  focus:ring-2
  focus:ring-[#FF76B9]/20
  shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]
  `;

  return (
    <div className="min-h-screen bg-[#FFF6FA]">
      <div className="max-w-[1000px] mx-auto grid grid-cols-[1fr_420px] gap-20 px-10 py-20">
        {/* LEFT SIDE */}

        <button
          onClick={() => navigate("/cart")}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#6d4b53] hover:text-[#FF76B9] transition"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="space-y-10">
          <div className="max-w-[560px] mx-auto space-y-10">
            {/* LOGO */}
            <div className="flex justify-center">
              <img
                src="../src/assets/images/Evah_logo.png"
                className="w-[130px] hover:scale-105 transition duration-300"
              />
            </div>
            {/* EXPRESS CHECKOUT */}
            <div className="space-y-6">
              <p className="text-center text-[13px] text-[#6d4b53] tracking-wide">
                Express checkout
              </p>

              <div className="bg-white border border-[#f2c9d8] rounded-xl p-3 shadow-sm">
                <div className="grid grid-cols-3 gap-3">
                  {/* gpay PAY */}

                  <button
                    className="
                    flex items-center justify-center gap-2
                    py-3 rounded-lg
                    bg-gradient-to-r from-[#5a31f4] to-[#7b5cff]
                    text-white text-sm font-medium
                    hover:shadow-lg hover:-translate-y-[2px]
                    transition duration-300
                    "
                  >
                    <span className="text-lg font-semibold">Paytm</span>
                  </button>

                  {/* PAYPAL */}

                  <button
                    className="
                    flex items-center justify-center gap-2
                    py-3 rounded-lg
                    bg-[#ffc439]
                    text-[#003087] text-sm font-semibold
                    hover:shadow-lg hover:-translate-y-[2px]
                    transition duration-300
                    "
                  >
                    PayPal
                  </button>

                  {/* GOOGLE PAY */}

                  <button
                    className="
                    flex items-center justify-center gap-2
                    py-3 rounded-lg
                    bg-black text-white text-sm font-medium
                    hover:shadow-lg hover:-translate-y-[2px]
                    transition duration-300
                    "
                  >
                    G Pay
                  </button>
                </div>
              </div>
            </div>
            {/* OR DIVIDER */}
            <div className="flex items-center gap-4">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>
            {/* CONTACT */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-medium">Contact</h2>
                <button className="text-blue-600 text-sm hover:underline">
                  Sign in
                </button>
              </div>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email or mobile phone number"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9] outline-none transition"
              />

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Email me with news and offers
              </label>
            </div>
            {/* DELIVERY */}
            <div className="space-y-4">
              <h2 className="text-[18px] font-medium">Delivery</h2>

              <select className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9]">
                <option>India</option>
              </select>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-md px-3 py-3 focus:border-[#FF76B9] outline-none transition"
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address ( Apartment, suite, etc. )"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9] outline-none transition"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9] outline-none transition"
                />

                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9] outline-none transition"
                >
                  <option>State</option>
                  <option>Maharashtra</option>
                  <option>Madhya pradesh</option>
                </select>

                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="ZIP code"
                  className="border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9] outline-none transition"
                />
              </div>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border border-gray-300 rounded-md px-4 py-3 focus:border-[#FF76B9] outline-none transition"
              />

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Text me with news and offers
              </label>
            </div>
            {/* SHIPPING */}
            <div className="space-y-4">
              <h2 className="text-[18px] font-medium">Shipping method</h2>

              <div className="bg-white border border-[#f2c9d8] rounded-md p-4 text-[13px] text-gray-500">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>
            {/* PAYMENT */}
            <div className="space-y-4">
              <h2 className="text-[18px] font-semibold text-[#2b1b1f]">
                Payment
              </h2>

              <p className="text-sm text-gray-500">
                All transactions are secure and encrypted.
              </p>

              <div className="border border-[#F4D6E2] rounded-xl overflow-hidden bg-white shadow-sm">
                {/* CREDIT CARD */}

                <label
                  className={`
                flex items-center justify-between p-4 cursor-pointer border-b transition
                ₹{paymentMethod === "card" ? "bg-[#FFF3F8]" : "hover:bg-[#FFF8FB]"}
                `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#FF76B9]"
                    />

                    <span className="font-medium text-[#2b1b1f]">
                      Credit card
                    </span>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-gray-100 rounded-md">
                      VISA
                    </span>

                    <span className="px-2 py-1 bg-gray-100 rounded-md">MC</span>

                    <span className="px-2 py-1 bg-gray-100 rounded-md">
                      AMEX
                    </span>
                  </div>
                </label>

                {paymentMethod === "card" && (
                  <div className="p-5 space-y-4 border-t">
                    <input placeholder="Card number" className={inputStyle} />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Expiration date (MM / YY)"
                        className={inputStyle}
                      />

                      <input
                        placeholder="Security code"
                        className={inputStyle}
                      />
                    </div>

                    <input placeholder="Name on card" className={inputStyle} />
                  </div>
                )}

                {/* G PAY */}

                <label
                  className={`
                flex items-center justify-between p-4 cursor-pointer border-t transition
                ₹{paymentMethod === "gpay" ? "bg-[#FFF3F8]" : "hover:bg-[#FFF8FB]"}
                `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "gpay"}
                      onChange={() => setPaymentMethod("gpay")}
                      className="accent-[#FF76B9]"
                    />

                    <span className="font-medium text-[#2b1b1f]">G Pay</span>
                  </div>

                  <span className="text-purple-600 font-semibold">G Pay</span>
                </label>

                {paymentMethod === "gpay" && (
                  <div className="p-5 text-sm text-gray-500 border-t bg-[#FFF9FB]">
                    Pay in full or in installments using G Pay.
                  </div>
                )}

                {/* PAYPAL */}

                <label
                  className={`
                flex items-center justify-between p-4 cursor-pointer border-t transition
                ₹{paymentMethod === "paypal" ? "bg-[#FFF3F8]" : "hover:bg-[#FFF8FB]"}
                `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="accent-[#FF76B9]"
                    />

                    <span className="font-medium text-[#2b1b1f]">PayPal</span>
                  </div>

                  <span className="text-blue-600 font-semibold">PayPal</span>
                </label>

                {paymentMethod === "paypal" && (
                  <div className="p-5 text-sm text-gray-500 border-t bg-[#FFF9FB]">
                    You'll be redirected to PayPal to complete your purchase.
                  </div>
                )}
              </div>

              {/* PAY BUTTON */}

              <button
                // onClick={() => navigate("/payment")}
                onClick={handlePay}
                className="
                w-full
                py-4
                rounded-xl
                bg-gradient-to-r
                from-[#FF76B9]
                to-[#ff9ecf]
                text-white
                font-semibold
                tracking-wide
                hover:shadow-lg
                hover:-translate-y-[1px]
                transition
                duration-300
                cursor-pointer
                "
              >
                {paymentMethod === "paypal"
                  ? "Pay with PayPal"
                  : paymentMethod === "gpay"
                    ? "Continue with G Pay"
                    : "Pay now"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT ORDER SUMMARY */}

        <div
          className="
            bg-[#FBE9F1]
            p-8
            rounded-2xl
            shadow-[0_20px_60px_rgba(255,118,185,0.15)]
            h-fit
            sticky
            top-10
            space-y-8
            "
        >
          <div className="max-h-[340px] overflow-y-auto pr-4 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative">
                  <img
                    src={item.image}
                    className="w-[60px] h-[70px] bg-white object-contain rounded-lg"
                  />

                  <span
                    className="
                    absolute
                    - top-2
                    - right-2
                    bg-[#FF76B9]
                    text-white
                    text-xs
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    rounded-full
                    "
                  >
                    {item.qty}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2b1b1f]">
                    {item.name}
                  </p>

                  {/* <p className="text-xs text-gray-500">1.7 Fl Oz / 50 ML</p> */}
                </div>

                <p className="text-sm font-semibold text-[#2b1b1f]">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          {/* DISCOUNT */}

          <div className="flex gap-2">
            <input
              placeholder="Discount code or gift card"
              className="flex-1 border border-[#f2c9d8] rounded-md px-4 py-3 bg-white"
            />

            <button
              className="
                px-4
                bg-[#FF76B9]
                text-white
                rounded-md
                hover:bg-[#ff5aa9]
                transition
                "
            >
              Apply
            </button>
          </div>

          {/* TOTAL */}

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>total amount · </span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>Enter shipping address</span>
            </div>

            <hr className="border-[#f2c9d8]" />

            <div className="flex justify-between text-lg font-semibold text-[#2b1b1f]">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
