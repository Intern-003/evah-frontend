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
    return (
      <div className="text-center mt-20 py-40 text-[#6d4b53]">
        Loading wishlist...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-40 text-red-500">{error}</div>;
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
                    src={item.product.image_url}
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
