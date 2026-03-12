import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useGet } from "../hooks/useGet";

const categories = [
  { label: "All", slug: "all" },
  { label: "Candles", slug: "candles" },
  { label: "Diffusers", slug: "diffusers" },
  { label: "Room Sprays", slug: "room-sprays" },
  { label: "Wax Melts", slug: "wax-melts" },
];

export default function HomeFragrance() {
  const [activeCategory, setActiveCategory] = useState("all");

  /* ================= PAGINATION STATE ================= */
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  /* 🔥 Fetch all products */
  const { data, loading, error } = useGet("products");
  const allProducts = data?.products || [];

  /* 🔥 Step 1 — Filter only Home Fragrance products (parent_id = 4) */
  const homeFragranceProducts = allProducts.filter(
    (product) => product.category?.parent_id === 4,
  );

  /* 🔥 Step 2 — Category filter inside Home Fragrance */
  const filteredProducts =
    activeCategory === "all"
      ? homeFragranceProducts
      : homeFragranceProducts.filter(
          (product) => product.category?.slug === activeCategory,
        );

  /* 🔥 Reset page when category changes */
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
            HOME FRAGRANCE
          </p>

          <h1 className="font-serif text-[40px] md:text-[48px] text-[#2b1b1f] mb-6">
            Fragrance for Every Room.
          </h1>

          <p className="max-w-[760px] mx-auto text-[15px] leading-[1.9] text-[#6d4b53]">
            Create an atmosphere that lingers. From softly glowing candles to
            refined reed diffusers and room sprays, our home fragrances are
            designed to elevate your everyday spaces.
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
              Loading products...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 text-sm">
              Failed to load products.
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-sm text-[#6d4b53]">
              No products found.
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
                      image: item.image_url,
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
