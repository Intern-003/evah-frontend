import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useGet } from "../hooks/useGet";

const categories = [
  { label: "All Attars", slug: "all" },
  { label: "Oud", slug: "oud" },
  { label: "Rose", slug: "rose" },
  { label: "Amber", slug: "amber" },
];

export default function Attars() {
  const [activeCategory, setActiveCategory] = useState("all");

  /* ================= PAGINATION ================= */
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= API ================= */
  const { data, loading, error } = useGet("products");
  const allProducts = data?.products || [];

  /* ================= FILTER PARENT (ATTARS) ================= */
  // ⚠️ Change 3 to your real Attars parent_id
  const attarProducts = allProducts.filter(
    (product) => product.category?.parent_id === 7,
  );

  /* ================= CATEGORY FILTER ================= */
  const filteredProducts =
    activeCategory === "all"
      ? attarProducts
      : attarProducts.filter(
          (product) => product.category?.slug === activeCategory,
        );

  /* Reset page on filter change */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-[#FFF7F9] to-white py-32 pb-22 mt-25">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            ATTARS
          </p>

          <h1 className="font-serif text-[40px] md:text-[48px] text-[#2b1b1f] mb-6">
            Pure Oils. Timeless Tradition.
          </h1>

          <p className="max-w-[760px] mx-auto text-[15px] leading-[1.9] text-[#6d4b53]">
            Experience the art of traditional perfumery. Our attars are
            alcohol-free, concentrated perfume oils crafted from precious
            ingredients for a rich and intimate scent experience.
          </p>
        </div>
      </section>

      {/* ================= CATEGORY STRIP ================= */}
      <section className="bg-[#FFF1F4] border-y border-[#f1cfd6]">
        <div className="max-w-[1200px] mx-auto px-6">
          <ul className="flex justify-center gap-10 py-4 text-sm font-medium text-[#2b1b1f]">
            {categories.map((cat) => (
              <li
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`cursor-pointer transition ${
                  activeCategory === cat.slug
                    ? "font-semibold underline underline-offset-4"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="bg-white py-10">
        <div className="max-w-[1300px] mx-auto px-6">
          {loading ? (
            <p className="text-center text-sm text-[#6d4b53]">
              Loading attars...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 text-sm">
              Failed to load products.
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-sm text-[#6d4b53]">
              No attars found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {paginatedProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={{
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      actualPrice: item.sale_price,
                      salePrice: item.price,
                      // image: item.image_url,
                      image: item.image_url?.replace(
                        "/evah_backend/storage",
                        "/evah_backend/public/storage",
                      ),
                      // category: product.category.name, issue bcoz of parent id
                    }}
                  />
                ))}
              </div>

              {/* ================= PAGINATION ================= */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-3 mt-16">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-md text-sm transition ${
                          currentPage === page
                            ? "bg-[#c48b5a] text-white"
                            : "border border-[#e4a3b1] text-[#2b1b1f] hover:bg-[#fbe3e8]"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
