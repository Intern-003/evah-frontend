import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import toast from "react-hot-toast";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Wishlist() {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGet("wishlist");

  const { execute: addToCart, loading: cartLoading } = usePost("cart/add");

  const wishlist = data?.wishlist || [];

  const [loadingId, setLoadingId] = useState(null);

  if (loading) {
    return <WishlistSkeleton />;
  }

  if (error) {
    const isAuthError =
      typeof error === "string" &&
      error.toLowerCase().includes("unauthenticated");

    if (isAuthError) {
      return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF1F4] to-white px-6">
          <div className="bg-white p-10 rounded-[30px] shadow-[0_20px_50px_rgba(255,118,185,0.25)] text-center max-w-md w-full">
            <h2 className="text-2xl font-semibold text-[#2b1b1f] mb-3">
              Please Login 💖
            </h2>

            <p className="text-sm text-[#6d4b53] mb-6">
              You need to login before accessing your wishlist.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="
                px-8 py-3 rounded-full
                bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
                text-white text-sm tracking-wider
                shadow-[0_10px_30px_rgba(255,118,185,0.35)]
                hover:scale-105 transition cursor-pointer
              "
            >
              LOGIN NOW
            </button>
          </div>
        </section>
      );
    }

    return (
      <div className="text-center py-40 text-red-500">
        Something went wrong 😢
      </div>
    );
  }

  const removeItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      refetch(); // refresh wishlist after delete
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Remove wishlist error", err);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();

    setLoadingId(productId);

    try {
      const res = await addToCart({
        product_id: productId,
        quantity: 1,
      });

      if (res?.success) {
        toast.success("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      toast.error(err?.message || "Cart failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="mt-32 py-24 bg-gradient-to-b from-[#FFF7F9] to-white min-h-screen">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-4">
            Your Collection
          </p>

          <h1 className="text-4xl font-serif text-[#2b1b1f">Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#6d4b53] mb-3">Your wishlist is empty.</p>

            <button
              onClick={() => navigate("/shop-all")}
              className="
                px-8 py-3 rounded-full
                bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
                text-white
                shadow-[0_10px_30px_rgba(255,118,185,0.35)]
              "
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-10">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="
                  group relative bg-white p-6
                  rounded-[28px_28px_40px_28px]
                  border border-[#f3d2d9]
                  shadow-[0_15px_35px_rgba(228,163,177,0.18)]
                  hover:-translate-y-2 transition
                "
              >
                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    absolute top-4 right-4
                    w-8 h-8 rounded-full
                    bg-[#fff1f4]
                    text-[#FF76B9]
                    flex items-center justify-center
                    hover:bg-[#FF76B9]
                    hover:text-white
                    cursor-pointer
                  "
                >
                  ✕
                </button>

                {/* IMAGE */}
                <div
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="cursor-pointer"
                >
                  <img
                    // src={item.product.image_url}
                    src={item.product.image_url.replace(
                      "/evah_backend/storage",
                      "/evah_backend/public/storage",
                    )}
                    alt={item.product.name}
                    className="
                      h-[200px]
                      object-contain
                      mx-auto
                      mb-6
                      group-hover:scale-105
                      transition
                    "
                  />
                </div>

                {/* INFO */}
                <h3 className="text-sm font-semibold text-[#2b1b1f]">
                  {item.product.name}
                </h3>

                <p className="text-xs text-[#6d4b53] mt-1">
                  {item.product.description}
                </p>

                <div className="flex gap-2 mt-3 items-center">
                  <span className="text-sm text-[#6d4b53] line-through">
                    ₹{item.product.price}
                  </span>

                  <span className="text-[#FF76B9] font-semibold">
                    ₹{item.product.sale_price}
                  </span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, item.product.id)}
                  // disabled={cartLoading}
                  disabled={loadingId === item.product.id}
                  className="
                    mt-6 w-full py-2 rounded-full
                    border border-[#FF76B9]
                    text-[#FF76B9]
                    text-xs tracking-wider
                    hover:bg-[#FF76B9]
                    hover:text-white
                    cursor-pointer
                  "
                >
                  {/* {cartLoading ? "ADDING..." : "ADD TO CART"} */}
                  {loadingId === item.product.id ? "ADDING..." : "ADD TO CART"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WishlistSkeleton() {
  return (
    <section className="mt-32 py-24 bg-gradient-to-b from-[#FFF7F9] to-white min-h-screen animate-pulse">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="h-3 w-32 bg-[#f6dce4] rounded mx-auto mb-4"></div>
          <div className="h-8 w-40 bg-[#efc6d4] rounded mx-auto"></div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="
                bg-white p-6
                rounded-[28px_28px_40px_28px]
                border border-[#f3d2d9]
                shadow-[0_10px_25px_rgba(228,163,177,0.12)]
              "
            >
              {/* REMOVE BTN */}
              <div className="flex justify-end mb-2">
                <div className="w-8 h-8 rounded-full bg-[#f6dce4]"></div>
              </div>

              {/* IMAGE */}
              <div className="h-[180px] bg-[#f6dce4] rounded mb-6"></div>

              {/* TITLE */}
              <div className="h-4 w-32 bg-[#efc6d4] rounded mb-2"></div>

              {/* DESC */}
              <div className="h-3 w-full bg-[#f6dce4] rounded mb-1"></div>
              <div className="h-3 w-[80%] bg-[#f6dce4] rounded mb-3"></div>

              {/* PRICE */}
              <div className="flex gap-2 mb-4">
                <div className="h-3 w-12 bg-[#f6dce4] rounded"></div>
                <div className="h-4 w-14 bg-[#FFB3D1]/70 rounded"></div>
              </div>

              {/* BUTTON */}
              <div className="h-9 w-full bg-[#f6dce4] rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
