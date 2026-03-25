import { useState } from "react";
import { useGet } from "../hooks/useGet";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState(5000);

  const { data, loading } = useGet("products");

  const products = data?.products || [];

  const filtered = products
    .filter((p) => {
      const productPrice = Number(p.sale_price || p.price);

      return (
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        productPrice <= price
      );
    })
    .slice(0, 12);

  const recommended = products.slice(0, 12);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[999] flex justify-center items-start pt-0 md:pt-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full md:w-[1100px]
          h-[100vh] md:h-[680px]
          bg-gradient-to-br from-white to-[#fff6fa]
          md:rounded-3xl
          shadow-[0_25px_80px_rgba(255,118,185,0.25)]
          overflow-hidden
          flex flex-col
          animate-slideUp
        "
      >
        {/* HEADER */}
        <div className="p-4 md:p-6 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search luxury perfumes..."
            className="
              flex-1
              px-4 md:px-5 py-2 md:py-3
              rounded-full
              bg-white
              shadow-inner
              border border-[#f3d2d9]
              focus:outline-none
              focus:ring-2
              focus:ring-[#FF76B9]/30
              text-sm
            "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-lg md:text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* FILTERS */}
          <div className="w-full md:w-[240px] px-4 md:px-6 py-4 border-b md:border-b-0 md:border-r border-[#f3d2d9]">
            <p className="text-sm font-semibold mb-3">Price Range</p>

            <input
              type="range"
              min="0"
              max="10000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#FF76B9]"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹{price}</span>
            </div>

            {/* TAGS */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Popular</p>

              <div className="flex gap-2 overflow-x-auto">
                {["Fresh", "Woody", "Luxury", "Office"].map((tag) => (
                  <span
                    key={tag}
                    className="
                      whitespace-nowrap
                      px-3 py-1
                      text-xs
                      bg-[#FFF1F6]
                      text-[#FF76B9]
                      rounded-full
                      cursor-pointer
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
            {loading && (
              <p className="text-center text-gray-400">Loading products...</p>
            )}

            {!loading && (
              <>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onClose();
                          navigate(`/product/${item.id}`);
                        }}
                        className="
                          bg-white/80
                          backdrop-blur-md
                          rounded-xl md:rounded-2xl
                          p-3 md:p-4
                          hover:shadow-lg
                          transition
                          cursor-pointer
                        "
                      >
                        <div className="h-[110px] md:h-[150px] flex items-center justify-center">
                          <img
                            // src={item.image_url}
                            src={item.image_url.replace(
                              "/evah_backend/storage",
                              "/evah_backend/public/storage",
                            )}
                            className="h-full object-contain"
                          />
                        </div>

                        <p className="mt-2 text-xs md:text-sm font-medium line-clamp-2">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#FF76B9]">
                          ₹{item.sale_price || item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-center text-gray-400 mb-4">
                      No Product Found
                    </p>

                    <h3 className="font-medium mb-3">Recommended</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {recommended.map((item) => (
                        <div
                          key={item.id}
                          className="
                            bg-white/80
                            rounded-xl md:rounded-2xl
                            p-3 md:p-4
                          "
                        >
                          <div className="h-[100px] md:h-[140px] flex items-center justify-center">
                            <img
                              src={item.image_url}
                              className="h-full object-contain"
                            />
                          </div>

                          <p className="mt-2 text-xs md:text-sm line-clamp-2">
                            {item.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.25s ease;
          }

          .animate-slideUp {
            animation: slideUp 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
        `}
      </style>
    </div>
  );
}
