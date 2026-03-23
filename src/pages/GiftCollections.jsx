import { useEffect, useState, useRef } from "react";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

const categories = ["Perfumes Gifts?", "Sets & collections?"];
const priceFilters = ["All", "Affordable", "Premium", "Luxury"];

export default function GiftCollections() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePrice, setActivePrice] = useState("All");

  const { data, loading, error } = useGet("products");

  const allProducts = data?.products || [];

  const { execute } = usePost("cart/add");

  const addSetToCart = async (products) => {
    try {
      for (const product of products) {
        await execute({
          product_id: product.id,
          quantity: 1,
        });
      }

      toast.success("Collection added to cart");

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error("Failed to add set");
    }
  };

  /* Filter only gifts category */
  const products = allProducts.filter(
    (product) => product.category?.slug === "gifts",
  );

  /* Pagination */
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  /* Reset page on filter change */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activePrice]);

  const perfumesRef = useRef(null);
  const collectionsRef = useRef(null);

  /* ================= FILTER LOGIC ================= */
  const filteredProducts = products.filter((product) => {
    const priceMatch =
      activePrice === "All" ||
      (activePrice === "Affordable" && product.price < 5000) ||
      (activePrice === "Premium" &&
        product.price >= 5000 &&
        product.price < 12000) ||
      (activePrice === "Luxury" && product.price >= 12000);

    return priceMatch;
  });

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const gentlemanCollection = allProducts
    .filter((p) => p.category?.slug === "gentleman-set")
    .slice(0, 2);

  const womenCollection = allProducts
    .filter((p) => p.category?.slug === "women-set")
    .slice(0, 2);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[480px] overflow-hidden">
        <img
          src="../src/assets/images/Gifts.png"
          alt="Gift Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 mt-13">
          <h1 className="text-[36px] font-serif mb-4">Gift & Collections</h1>
          <p className="max-w-[600px] text-sm md:text-base">
            Elegant gifting options crafted to create unforgettable moments.
          </p>
        </div>

        {/* CATEGORY STRIP */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#FFE8EB] to-[#FFF7F8] z-20">
          <div className="max-w-[1440px] mx-auto px-10">
            <ul className="flex justify-center gap-10 py-3 text-sm font-medium text-[#2b1b1f]">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);

                    if (cat === "Perfumes Gifts?") {
                      const offset = 180; // header height adjust karo
                      const element = perfumesRef.current;

                      const y =
                        element.getBoundingClientRect().top +
                        window.pageYOffset -
                        offset;

                      window.scrollTo({ top: y, behavior: "smooth" });
                    }

                    if (cat === "Sets & collections?") {
                      collectionsRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`cursor-pointer select-none transition
                    ${
                      activeCategory === cat
                        ? "font-semibold underline underline-offset-4"
                        : "opacity-80 hover:opacity-100"
                    }
                  `}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= TOP BAR ================= */}
      <section className="bg-white pt-16">
        <div className="max-w-[1340px] mx-auto px-10 flex gap-10">
          {/* RIGHT CONTENT */}
          <div className="flex-1">
            {/* TOP BAR */}
            <div
              className="flex justify-between items-center mb-10
                      bg-gradient-to-r from-[#FFF1F4] via-[#FFE6EC] to-[#FFF7F8]
                      border-[#f3cdd5]
                      rounded-2xl px-6 py-4"
            >
              {/* LEFT TITLE */}
              <div ref={perfumesRef} className="flex flex-col">
                <h2 className="text-[26px] font-serif text-[#2b1b1f]">
                  {/* {activeCategory} Perfumes */}
                  Perfumes Gifts
                </h2>
                <span className="w-12 h-[2px] bg-[#e4a3b1] mt-1 rounded-full" />
              </div>

              {/* RIGHT SORT */}
              <select
                value={activePrice}
                onChange={(e) => setActivePrice(e.target.value)}
                className="border border-[#e4a3b1] rounded-full px-4 py-2 text-sm bg-white"
              >
                {priceFilters.map((price) => (
                  <option key={price}>{price}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      {/* ================= PRODUCT GRID ================= */}
      <section className="bg-white pt-5 py-16">
        <div className="max-w-[1400px] mx-auto px-10">
          {loading ? (
            <p className="text-sm text-[#6d4b53]">Loading gifts…</p>
          ) : (
            <>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      description: product.description,
                      actualPrice: product.sale_price,
                      salePrice: product.price,
                      image: product.image_url,
                      category: product.category.name,
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

      <section ref={collectionsRef} className="bg-white py-28 mt-0 pt-5">
        <div className="max-w-[1300px] mx-auto px-6">
          {/* ===== HEADER ===== */}
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4 ">
              COLLECTIONS SETS
            </p>

            <p className="max-w-[760px] mx-auto text-[15px] leading-[1.9] text-[#6d4b53]">
              From curated discovery sets to luxurious gift collections, find
              the perfect fragrance experience for every occasion—and every
              person.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto px-10 space-y-36">
            {/* ===== GENTLEMAN COLLECTION ===== */}
            <div className="grid md:grid-cols-2 gap-24 items-center">
              {/* LEFT CONTENT */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#b88994] mb-4">
                  SCENTSATIONAL JOURNEY
                </p>

                <h2 className="font-serif text-[36px] text-[#2b1b1f] mb-12">
                  The Gentleman&apos;s Collection
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {gentlemanCollection.map((product) => {
                    const discount =
                      product.sale_price &&
                      Math.round(
                        ((product.price - product.sale_price) / product.price) *
                          100,
                      );

                    return (
                      <div
                        key={product.id}
                        className="
                        group
                        bg-white
                        border border-[#f3d2d9]
                        rounded-2xl
                        p-4
                        hover:shadow-xl
                        transition
                        "
                      >
                        {/* IMAGE */}

                        <div className="relative h-[140px] flex items-center justify-center mb-4">
                          {discount && (
                            <span
                              className="
                              absolute top-0 left-0
                              bg-[#FF76B9]
                              text-white
                              text-[10px]
                              px-2 py-1
                              rounded-full
                              "
                            >
                              {discount}% OFF
                            </span>
                          )}

                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="
                            max-h-[120px]
                            object-contain
                            group-hover:scale-105
                            transition
                            "
                          />
                        </div>

                        {/* NAME */}

                        <h3 className="text-sm font-medium text-[#2b1b1f]">
                          {product.name}
                        </h3>

                        {/* PRICE */}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#FF76B9] font-semibold text-sm">
                            ₹{product.sale_price ?? product.price}
                          </span>

                          {product.sale_price && (
                            <span className="text-xs line-through text-gray-400">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => addSetToCart(gentlemanCollection)}
                  className="
                    mt-12 w-full
                    bg-gradient-to-r from-[#f7c6d0] via-[#f3a8b8] to-[#e48fa3]
                    hover:from-[#e48fa3] hover:via-[#f3a8b8] hover:to-[#f7c6d0]
                    text-white
                    text-[12px] tracking-[0.25em]
                    py-4 rounded-full
                    transition-all duration-300
                    shadow-[0_12px_35px_rgba(228,143,163,0.45)]
                    hover:shadow-[0_18px_45px_rgba(228,143,163,0.6)]
                    active:scale-[0.98]
                    cursor-pointer
                  "
                >
                  ADD SET TO CART
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#fbe3e8] to-transparent blur-2xl opacity-70" />
                <img
                  src="/src/assets/images/mencollectionss.jpeg"
                  alt="Gentleman Collection"
                  className="relative z-10 w-full rounded-3xl object-cover shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>

            {/* ===== CONFIDENT WOMAN COLLECTION ===== */}
            <div className="grid md:grid-cols-2 gap-24 items-center">
              {/* RIGHT IMAGE */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#fbe3e8] to-transparent blur-2xl opacity-70" />
                <img
                  src="/src/assets/images/womencollectionss.jpeg"
                  alt="Confident Woman Collection"
                  className="relative z-10 w-full rounded-3xl object-cover shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                />
              </div>

              {/* LEFT CONTENT */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#b88994] mb-4">
                  SCENTSATIONAL JOURNEY
                </p>

                <h2 className="font-serif text-[36px] text-[#2b1b1f] mb-12">
                  Confident Woman&apos;s Collection
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {womenCollection.map((product) => {
                    const discount =
                      product.sale_price &&
                      Math.round(
                        ((product.price - product.sale_price) / product.price) *
                          100,
                      );

                    return (
                      <div
                        key={product.id}
                        className="
                        group
                        bg-white
                        border border-[#f3d2d9]
                        rounded-2xl
                        p-4
                        hover:shadow-xl
                        transition
                        "
                      >
                        {/* IMAGE */}

                        <div className="relative h-[140px] flex items-center justify-center mb-4">
                          {discount && (
                            <span
                              className="
                              absolute top-0 left-0
                              bg-[#FF76B9]
                              text-white
                              text-[10px]
                              px-2 py-1
                              rounded-full
                              "
                            >
                              {discount}% OFF
                            </span>
                          )}

                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="
                            max-h-[120px]
                            object-contain
                            group-hover:scale-105
                            transition
                            "
                          />
                        </div>

                        {/* NAME */}

                        <h3 className="text-sm font-medium text-[#2b1b1f]">
                          {product.name}
                        </h3>

                        {/* PRICE */}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[#FF76B9] font-semibold text-sm">
                            ₹{product.sale_price ?? product.price}
                          </span>

                          {product.sale_price && (
                            <span className="text-xs line-through text-gray-400">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => addSetToCart(womenCollection)}
                  className="
                    mt-12 w-full
                    bg-gradient-to-r from-[#f7c6d0] via-[#f3a8b8] to-[#e48fa3]
                    hover:from-[#e48fa3] hover:via-[#f3a8b8] hover:to-[#f7c6d0]
                    text-white
                    text-[12px] tracking-[0.25em]
                    py-4 rounded-full
                    transition-all duration-300
                    shadow-[0_12px_35px_rgba(228,143,163,0.45)]
                    hover:shadow-[0_18px_45px_rgba(228,143,163,0.6)]
                    active:scale-[0.98]
                    cursor-pointer
                  "
                >
                  ADD SET TO CART
                </button>
              </div>
            </div>
          </div>

          {/* ===== GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"></div>
        </div>
      </section>
    </>
  );
}
