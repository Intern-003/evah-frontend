import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FiltersSidebar from "../components/FiltersSidebar";
import { useGet } from "../hooks/useGet";

const categories = ["women", "men", "unisex", "All"];

export default function NewArrivals() {
  const { data, loading, error } = useGet("products/new-arrivals");

  const [filters, setFilters] = useState({});
  const [activeCategory, setActiveCategory] = useState("women");

  // API response structure:
  // { success: true, products: [...] }
  const products = data?.products || [];

  const filteredProducts = products.filter((product) => {
    // CATEGORY
    if (
      activeCategory !== "All" &&
      product.category?.name?.toLowerCase() !== activeCategory.toLowerCase()
    ) {
      return false;
    }

    // PRICE FILTER
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }

    // FRAGRANCE TYPE
    if (filters.type?.length) {
      if (!filters.type.includes(product.type)) {
        return false;
      }
    }

    // SCENT FAMILY
    if (filters.family?.length) {
      if (!filters.family.includes(product.family)) {
        return false;
      }
    }

    // NOTES
    if (filters.notes?.length) {
      if (!filters.notes.includes(product.notes)) {
        return false;
      }
    }

    // OCCASION
    if (filters.occasion?.length) {
      if (!filters.occasion.includes(product.occasion)) {
        return false;
      }
    }

    // LONGEVITY
    if (filters.longevity?.length) {
      if (!filters.longevity.includes(product.longevity)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      {/* ================= TOP BANNER ================= */}
      <section className="relative w-full h-[490px] overflow-hidden">
        <img
          src="../src/assets/images/newarrivals.png"
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto h-full px-10 flex flex-col items-center justify-center text-center mt-13">
          <h1 className="text-white text-[32px] font-semibold tracking-wide">
            New Arrivals
          </h1>

          <p className="text-white/85 text-sm max-w-[620px] leading-relaxed">
            Discover our latest creations — bold, refined fragrances designed to
            leave a lasting impression.
          </p>
        </div>

        {/* CATEGORY STRIP */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#FFE8EB] to-[#FFF7F8] z-20">
          <div className="max-w-[1440px] mx-auto px-10">
            <ul className="flex justify-center gap-10 py-3 text-sm font-medium text-[#2b1b1f]">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer transition ${
                    activeCategory === cat
                      ? "font-semibold underline underline-offset-4"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="bg-white py-16">
        <div className="max-w-[1440px] mx-auto px-10 flex gap-10">
          <FiltersSidebar filters={filters} setFilters={setFilters} />

          <div className="flex-1">
            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-10 bg-gradient-to-r from-[#FFF1F4] via-[#FFE6EC] to-[#FFF7F8] rounded-2xl px-6 py-4">
              <div className="flex flex-col">
                <h2 className="text-[26px] font-serif text-[#2b1b1f]">
                  Latest {activeCategory} Perfumes
                </h2>
                <span className="w-12 h-[2px] bg-[#e4a3b1] mt-1 rounded-full" />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">
                Failed to load new arrivals.
              </p>
            )}

            {/* LOADING */}
            {loading ? (
              <p className="text-sm text-[#6d4b53]">Loading products…</p>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE8EB] to-[#FFD6E0] flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">💖</span>
                </div>

                <h3 className="text-xl font-serif text-[#2b1b1f] mb-2">
                  No New Arrivals Yet
                </h3>

                <p className="text-sm text-[#6d4b53] max-w-md">
                  Our latest fragrances are on their way. Stay tuned for
                  luxurious new launches crafted to captivate.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-15">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      description: product.description,
                      actualPrice: product.sale_price,
                      salePrice: product.price,
                      image: product.image_url,
                      category: product.category?.name,

                      type: product.type,
                      family: product.family,
                      notes: product.notes,
                      occasion: product.occasion,
                      longevity: product.longevity,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
