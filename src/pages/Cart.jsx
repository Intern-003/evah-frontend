import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePut } from "../hooks/usePut";
import { useDelete } from "../hooks/useDelete";
import toast from "react-hot-toast";
import CartSkeleton from "../components/CartSkeleton";

export default function Cart() {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGet("cart");
  const { executePut } = usePut();
  const { executeDelete } = useDelete();

  if (loading) {
    return <CartSkeleton />;
  }

  const cart =
    data?.cart_items?.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.sale_price ?? item.product.price,
      qty: item.quantity,
      image: item.product.image_url,
    })) || [];

  const updateQty = async (id, type) => {
    const item = cart.find((i) => i.id === id);

    const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;

    if (newQty < 1) return;

    await executePut(`cart/item/${id}`, {
      quantity: newQty,
    });

    refetch();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = async (id) => {
    try {
      const res = await executeDelete(`cart/item/${id}`);

      if (res?.success) {
        toast.success("Item removed from cart");

        refetch();
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);

  const shipping = subtotal > 15000 ? 0 : 499;

  const total = subtotal + shipping;

  return (
    <section className="mt-32 pb-32 bg-gradient-to-b from-[#FFF7F9] to-white min-h-screen">
      {/* HEADER */}
      <div className="max-w-[1300px] mx-auto px-6 mb-16 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-3 pt-20">
          Your Bag
        </p>

        <h1 className="font-serif text-[42px] text-[#2b1b1f]">Shopping Cart</h1>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-[1.6fr_1fr] gap-14">
        {/* LEFT CART ITEMS */}
        {/* <div className="space-y-10">
          {cart.map((item) => ( */}
        <div className="space-y-10">
          {cart.length === 0 ? (
            <div className="text-center py-30">
              <h2 className="text-2xl font-serif text-[#2b1b1f] mb-3">
                Your cart is empty
              </h2>

              <p className="text-[#6d4b53] mb-8">
                Looks like you haven't added any fragrances yet.
              </p>

              <button
                onClick={() => navigate("/shop-all")}
                className="
                  px-8 py-3
                  rounded-full
                  bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
                  text-white
                  shadow-[0_10px_30px_rgba(255,118,185,0.35)]
                  hover:-translate-y-1
                  transition
                  cursor-pointer
                "
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="
                flex gap-6
                bg-white
                p-6
                rounded-[32px]
                border border-[#f3d2d9]
                shadow-[0_20px_60px_rgba(228,163,177,0.2)]
                "
              >
                <img src={item.image} className="w-[120px] object-contain" />

                <div className="flex-1">
                  <h3 className="font-medium text-[#2b1b1f] text-[18px]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#6d4b53] mt-1">
                    Luxury fragrance
                  </p>

                  <p className="text-[#FF76B9] font-semibold mt-3">
                    ₹{item.price}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center mt-5 gap-4">
                    <div className="flex items-center border border-[#f1cfd6] rounded-full px-3">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="px-3 py-1 cursor-pointer"
                      >
                        −
                      </button>

                      <span className="px-4 text-sm">{item.qty}</span>

                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="px-3 py-1 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-[#6d4b53] hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="font-semibold text-[#2b1b1f]">
                    ₹{item.price * item.qty}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="sticky top-50 h-fit">
          <div
            className="
            bg-white
            p-8
            rounded-[32px]
            border border-[#f3d2d9]
            shadow-[0_20px_60px_rgba(228,163,177,0.2)]
            "
          >
            <h3 className="text-lg font-medium text-[#2b1b1f] mb-6">
              Order Summary
            </h3>

            {/* COUPON */}
            <div className="flex mb-6">
              <input
                placeholder="Promo code"
                className="
                flex-1
                border border-[#f1cfd6]
                rounded-l-full
                px-4 py-2
                text-sm
                "
              />

              <button
                className="
                px-6
                bg-[#FF76B9]
                text-white
                rounded-r-full
                text-sm
                "
              >
                Apply
              </button>
            </div>

            {/* PRICES */}
            <div className="space-y-3 text-sm text-[#6d4b53]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-medium text-[#2b1b1f]">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={() => navigate("/Checkout")}
              className="
              mt-8 w-full py-4
              rounded-full
              bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
              text-white
              tracking-[0.25em]
              shadow-[0_10px_30px_rgba(255,118,185,0.35)]
              cursor-pointer
              "
            >
              CHECK OUT
            </button>

            <button
              onClick={() => navigate("/shop-all")}
              className="
              mt-4 w-full py-3
              border border-[#f1cfd6]
              rounded-full
              text-sm
              cursor-pointer
              "
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
