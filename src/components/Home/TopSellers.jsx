import { useState } from "react";
import ProductCard from "../ProductCard";
import { useGet } from "../../hooks/useGet"; // adjust path

const categories = ["men", "women", "unisex"];

export default function TopSellers() {
  const { data, loading, error } = useGet("products");

  const [activeCategory, setActiveCategory] = useState("men");

  const allProducts = data?.products || [];

  /* ✅ Category wise filter */
  const filteredProducts = allProducts.filter(
    (product) =>
      product.category?.name?.toLowerCase() === activeCategory.toLowerCase(),
  );

  return (
    <section className="bg-[#FFE8EB] pt-7 py-14">
      <div className="max-w-[1320px] mx-auto px-8">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-[36px] font-serif text-[#2b1b1f]">Top Sellers</h2>
          <p className="text-sm text-[#6d4b53] mt-1">Everyone’s Favorites</p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium
                border transition-all duration-300 cursor-pointer
                ${
                  activeCategory === cat
                    ? "bg-[#FF76B9] text-white border-[#FF76B9]"
                    : "bg-white text-[#2b1b1f] border-[#2b1b1f]/30 hover:border-[#FF76B9]"
                }
              `}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500 text-sm">
            Failed to load products.
          </p>
        )}

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-sm text-[#6d4b53]">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-sm text-[#6d4b53]">
            No products found
          </p>
        ) : (
          <div className="grid md:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  actualPrice: product.sale_price,
                  salePrice: product.price,
                  // image: product.image_url,
                  image: product.image_url?.replace(
                    "/evah_backend/storage",
                    "/evah_backend/public/storage",
                  ),
                  // category: product.category.name,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
