import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useGet } from "../hooks/useGet";
import { useDelete } from "../hooks/useDelete";
import { usePut } from "../hooks/usePut";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useGet("cart");

  const { executeDelete, loading: deleteLoading } = useDelete();

  const { executePut, loading: updateLoading } = usePut();

  const cart =
    data?.cart_items?.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.sale_price ?? item.product.price,
      qty: item.quantity,
      image: item.product.image_url,
    })) || [];

  const [time, setTime] = useState(600);

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);

  const [loadingId, setLoadingId] = useState(null);

  const updateQty = async (id, type) => {
    const item = cart.find((i) => i.id === id);

    const newQty = type === "inc" ? item.qty + 1 : item.qty - 1;

    if (newQty < 1) return;

    try {
      setLoadingId(id);

      await executePut(`cart/item/${id}`, {
        quantity: newQty,
      });

      refetch();
      window.dispatchEvent(new Event("cartUpdated"));
    } finally {
      setLoadingId(null);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await executeDelete(`cart/item/${id}`);

      if (res?.success) {
        toast.success("Item removed from cart");

        refetch(); // refresh drawer
        window.dispatchEvent(new Event("cartUpdated")); // update header
      }
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const refresh = () => refetch();

    window.addEventListener("cartUpdated", refresh);

    return () => window.removeEventListener("cartUpdated", refresh);
  }, [refetch]);

  const min = Math.floor(time / 60);
  const sec = time % 60;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-md transition z-[9998]
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* DRAWER */}

      <div
        className={`fixed right-0 top-0 h-full
        w-[390px]
        bg-white
        shadow-[0_50px_140px_rgba(0,0,0,0.35)]
        z-[9999]
        transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
        flex flex-col

        rounded-l-[32px]

        ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}

        <div className="flex justify-between items-center px-8 py-6 border-b border-[#f1d4dc] mt-1">
          <h2 className="tracking-[0.25em] text-[13px] text-[#2b1b1f] font-semibold">
            SHOPPING CART
          </h2>

          <button
            onClick={onClose}
            className="
            text-xl
            text-[#8b6a72]
            hover:rotate-90
            transition
            duration-300
            cursor-pointer
            "
          >
            ✕
          </button>
        </div>

        {/* TAGLINE */}

        <div className="text-center text-[12px] text-[#8b6a72] py-3 border-b border-[#f1d4dc]">
          Your favorites, multiplied.
        </div>

        {/* ITEMS */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-8
            py-8
            space-y-10
            "
        >
          {/* LOADING SKELETON */}

          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-5 pb-8 border-b border-[#f1d4dc] animate-pulse"
              >
                {/* IMAGE */}
                <div className="w-[80px] h-[100px] bg-[#f5e5ea] rounded-xl"></div>

                {/* CONTENT */}
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-[70%] bg-[#f5e5ea] rounded"></div>

                  <div className="h-3 w-[40%] bg-[#f5e5ea] rounded"></div>

                  <div className="h-8 w-[90px] bg-[#f5e5ea] rounded-full"></div>

                  <div className="h-3 w-[50px] bg-[#f5e5ea] rounded"></div>
                </div>
              </div>
            ))}

          {/* EMPTY CART */}

          {!loading && cart.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF76B9"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="18" cy="21" r="1" />
                <path d="M6 6h15l-1.5 9h-13z" />
              </svg>

              <h3 className="mt-6 text-[16px] font-medium text-[#2b1b1f]">
                Your cart is empty
              </h3>

              <p className="text-sm text-[#8b6a72] mt-2 max-w-[220px]">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => navigate("/shop-all"), 350);
                }}
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-full
                  bg-[#FF76B9]
                  text-white
                  text-sm
                  hover:scale-105
                  transition
                "
              >
                Start Shopping
              </button>
            </div>
          )}

          {/* CART ITEMS */}

          {!loading &&
            cart.length > 0 &&
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQty={updateQty}
                removeItem={removeItem}
                loading={loadingId === item.id}
              />
            ))}

          {/* OFFER TIMER */}

          <div
            className="
            bg-[#f8e9ee]
            rounded-xl
            text-center
            py-4
            text-[12px]
            text-[#7b5c63]
            tracking-wide
            shadow-sm
            "
          >
            Hurry — your special offer ends in {min}:
            {sec < 10 ? `0${sec}` : sec}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#f1d4dc] px-8 py-6 space-y-5 mb-1">
          <div className="flex justify-between text-[14px] text-[#2b1b1f] font-medium">
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{subtotal}</span>
          </div>

          {/* CHECKOUT BUTTON */}

          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                navigate("/checkout");
              }, 350); // drawer animation time
            }}
            className="
            group
            relative
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-[#FF5FA2]
            via-[#FF76B9]
            to-[#FF9FCC]
            text-white
            font-medium
            tracking-wide
            overflow-hidden
            shadow-[0_15px_40px_rgba(255,118,185,0.45)]
            transition
            duration-500
            hover:scale-[1]
            active:scale-[0.97]
            cursor-pointer
            "
          >
            {/* LIGHT SWEEP */}

            <span
              className="
                absolute
                top-0
                left-[-100%]
                w-full
                h-full
                bg-gradient-to-r
                from-transparent
                via-white/40
                to-transparent
                group-hover:left-[100%]
                transition-all
                duration-700
                "
            />

            <span className="relative z-10 flex justify-center items-center gap-2">
              Checkout →
            </span>
          </button>

          {/* VIEW CART BUTTON */}

          <button
            onClick={() => {
              onClose();

              setTimeout(() => {
                navigate("/cart");
              }, 350); // drawer animation time
            }}
            className="
            group
            relative
            w-full
            py-3
            rounded-xl
            bg-[#FFE4EF]
            text-[#FF4D9D]
            font-medium
            tracking-wide
            overflow-hidden
            border
            border-[#FFD0E2]
            transition
            duration-500
            hover:bg-[#FFD9EC]
            hover:shadow-[0_10px_30px_rgba(255,118,185,0.25)]
            hover:scale-[1.01]
            active:scale-[0.97]
            cursor-pointer
            "
          >
            {/* RIPPLE EFFECT */}

            <span
              className="
                absolute
                w-0
                h-0
                rounded-full
                bg-[#FF76B9]/20
                group-hover:w-[500px]
                group-hover:h-[500px]
                transition-all
                duration-700
                "
            />

            <span className="relative z-10 flex justify-center items-center gap-2">
              View Cart
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
