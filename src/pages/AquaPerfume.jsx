import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useGet } from "../hooks/useGet";

import aquapageImg from "../../src/assets/images/aquapage.png";

const categories = [
  { label: "All", slug: "all" },
  { label: "Marine", slug: "marine" },
  { label: "Citrus", slug: "citrus" },
  { label: "Musk", slug: "musk" },
];

export default function AquaPerfume() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");

  /* ================= PAGINATION ================= */
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= API ================= */
  const { data, loading, error } = useGet("products");
  const allProducts = data?.products || [];

  /* ================= FILTER PARENT (AQUA) ================= */
  // ⚠️ Change 6 to your real Aqua Perfume parent_id
  // const aquaProducts = allProducts.filter(
  //   (product) => product.category?.parent_id === 9,
  //   // (product) => product.category?.slug === "aqua-perfume",
  // );

  const aquaProducts = allProducts.filter(
    (product) =>
      product.category?.slug === "aqua-perfume" ||
      product.category?.parent_id === 9,
  );

  /* ================= CATEGORY FILTER ================= */
  let filteredProducts =
    activeCategory === "all"
      ? aquaProducts
      : aquaProducts.filter(
          (product) => product.category?.slug === activeCategory,
        );

  /* ================= SORT ================= */
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price) - Number(b.price),
    );
  } else if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price) - Number(a.price),
    );
  }

  /* Reset page on filter/sort change */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, sort]);

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e9f6ff] via-[#fff7f9] to-white mt-25">
      {/* ================= HERO ================= */}
      <div className="relative h-[650px] rounded-b-[20px] overflow-hidden">
        <img
          src={aquapageImg}
          alt="Aqua Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2d4a]/70 via-[#1e3f63]/60 to-[#fff7f9]/80" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white mt-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#bfe4ff] mb-4">
            AQUA PERFUME
          </p>

          <h1 className="font-serif text-[44px] md:text-[56px] mb-6 leading-tight">
            Light. Fluid. Effortless.
          </h1>

          <p className="max-w-[760px] text-[15px] leading-[1.9] text-white/90 mb-16">
            Inspired by ocean air and weightless elegance, our Aqua collection
            captures freshness in motion — luminous, clean, and quietly
            addictive.
          </p>
        </div>
      </div>

      {/* ================= FILTER + SORT ================= */}
      <div className="max-w-[1300px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 gap-4 md:gap-6">
          {/* CATEGORIES */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto md:flex-wrap pb-1">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`
                  whitespace-nowrap
                  px-4 md:px-6 py-2
                  rounded-full
                  text-xs md:text-sm
                  transition
                  ${
                    activeCategory === cat.slug
                      ? "bg-[#7bb7e3] text-white shadow-md"
                      : "bg-[#fff1f4] text-[#1f2b3a] hover:bg-[#e3f2ff] cursor-pointer"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* SORT */}
          <div className="w-full md:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="
                w-full md:w-auto
                border border-[#d6e9f8]
                px-4 py-2
                rounded-full
                text-xs md:text-sm
                bg-white
              "
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        {loading ? (
          <p className="text-center text-sm text-[#6d4b53]">
            Loading aqua perfumes...
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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
                          ? "bg-[#7bb7e3] text-white"
                          : "border border-[#d6e9f8] text-[#1f2b3a] hover:bg-[#e3f2ff]"
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
  );
}
