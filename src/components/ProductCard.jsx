import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { execute, loading } = usePost("wishlist/add");

  const { execute: addToCart, loading: cartLoading } = usePost("cart/add");

  const addToWishlist = async (e) => {
    e.stopPropagation();

    try {
      const res = await execute({
        product_id: product.id,
      });

      if (res?.success) {
        setWishlisted(true);
        toast.success("Added to wishlist");
        window.dispatchEvent(new Event("wishlistUpdated"));
      }
    } catch (err) {
      toast.error(err?.message || "Wishlist failed");
    }
  };

  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      const res = await addToCart({
        product_id: product.id,
        quantity: 1,
      });

      if (res?.success) {
        toast.success("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      toast.error(err?.message || "Cart failed");
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        group
        relative
        bg-white
        rounded-[28px_28px_40px_28px]
        p-5
        shadow-[0_12px_30px_rgba(255,118,185,0.15)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_50px_rgba(255,118,185,0.25)]
        overflow-hidden
        flex flex-col
        cursor-pointer
      "
    >
      {/* SOFT PINK GLOW */}
      <div
        className="
          absolute -top-24 -right-24
          w-48 h-48
          bg-[#FF76B9]/20
          rounded-full
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition duration-500
        "
      />

      {/* IMAGE */}
      <div className="relative h-[230px] flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full
            object-contain
            transition-all duration-700
            group-hover:scale-105
            group-hover:-rotate-2
          "
        />

        {/* CATEGORY BADGE */}
        <span
          className="
            absolute top-3 left-3
            bg-[#FF76B9]
            text-white
            text-[10px]
            px-3 py-1
            rounded-full
            tracking-widest
            shadow-md
          "
        >
          {product.category || "Perfume"}
        </span>

        {/* HOVER ACTION BUTTONS */}
        <div
          className="
            absolute right-3 top-6
            flex flex-col gap-3
          "
        >
          {/* WISHLIST */}
          <button
            onClick={addToWishlist}
            disabled={loading}
            className="
              w-9 h-9 
              bg-white
              rounded-full
              flex items-center justify-center
              shadow-md
              border border-[#FF76B9]
              text-[#FF76B9]
              opacity-0
              translate-x-6
              group-hover:opacity-100
              group-hover:translate-x-0
              transition-all duration-500
              delay-50
              hover:bg-[#fff1f4]
              hover:text-white
              hover:border-transparent
              hover:bg-[linear-gradient(135deg,#FF76B9,#FF9FCC)]
              hover:scale-100
              cursor-pointer
            "
          >
            <i
              className={`text-[14px] ${
                wishlisted
                  ? "fa-solid fa-heart text-[#FF76B9]"
                  : "fa-regular fa-heart"
              }`}
            />
          </button>

          {/* QUICK VIEW */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="
              w-9 h-9
              bg-white
              rounded-full
              flex items-center justify-center
              shadow-md
              border border-gray-100
              text-gray-700
              opacity-0
              translate-x-6
              group-hover:opacity-100
              group-hover:translate-x-0
              transition-all duration-500
              delay-0
              hover:bg-[#fff1f4]
              hover:text-[#FF76B9]
              hover:scale-100
            "
          >
            <i className="fa-solid fa-eye text-[14px]"></i>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        <h3 className="text-[14px] font-semibold text-[#2b1b1f] leading-snug">
          {product.name}
        </h3>

        <p className="text-[12px] text-[#6d4b53] mt-1">{product.description}</p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-4 mb-4">
          <span className="text-sm text-[#6d4b53] line-through">
            ₹{product.actualPrice}
          </span>
          <span className="text-[18px] font-semibold text-[#FF76B9]">
            ₹{product.salePrice}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={cartLoading}
          className="
            mt-auto
            relative overflow-hidden
            w-fit mx-auto
            px-14 py-3
            rounded-[999px_999px_18px_999px]
            border border-[#FF76B9]
            text-[#FF76B9]
            text-[11px]
            tracking-[0.20em]
            font-medium
            transition-all duration-500
            hover:text-white
            hover:border-transparent
            hover:bg-[linear-gradient(135deg,#FF76B9,#FF9FCC)]
            cursor-pointer
          "
        >
          <span className="relative z-10">
            <i className="fa-solid fa-bag-shopping text-[12px] pr-1"></i>
            {cartLoading ? "ADDING..." : "QUICK SHOP"}
          </span>
        </button>
      </div>
    </div>
  );
}
