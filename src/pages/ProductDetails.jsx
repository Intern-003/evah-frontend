import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";

export default function ProductDetails() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, loading, error } = useGet(`products/${id}`);

  const { data: relatedData, loading: relatedLoading } = useGet(
    `products/${id}/related`,
  );

  const relatedProducts = relatedData?.related_products || [];

  const { data: newArrivalData, loading: newArrivalLoading } = useGet(
    "products/new-arrivals",
  );

  const { execute: addToCart, loading: cartLoading } = usePost("cart/add");

  const { execute: addToWishlistApi, loading: wishlistLoading } =
    usePost("wishlist/add");

  const newArrivals = newArrivalData?.products || [];

  const [liked, setLiked] = useState(false);

  const product = data?.product;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("50ml");

  const { data: reviewData, loading: reviewLoading } = useGet(
    `products/${id}/reviews`,
  );

  const { execute: createReview } = usePost("reviews");

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (reviewData?.reviews) {
      setReviews(reviewData.reviews);
    }
  }, [reviewData]);

  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  if (loading) return <ProductDetailSkeleton />;

  if (error)
    return (
      <p className="text-center text-red-500 py-40">Failed to load product.</p>
    );

  if (!product) return <p className="text-center py-40">Product not found.</p>;

  const reviewsPerPage = 4;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginatedReviews = reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage,
  );

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

  const addToWishlist = async (e) => {
    e.stopPropagation();

    try {
      const res = await addToWishlistApi({
        product_id: product.id,
      });

      if (res?.success) {
        setLiked(true);
        toast.success("Added to wishlist");
        window.dispatchEvent(new Event("wishlistUpdated"));
      }
    } catch (err) {
      toast.error(err?.message || "Wishlist failed");
    }
  };

  const handleSubmit = async () => {
    if (!newReview.comment) return;

    try {
      const res = await createReview({
        product_id: product.id,
        rating: Number(newReview.rating),
        comment: newReview.comment,
      });

      if (res?.success) {
        toast.success("Review added");

        setReviews((prev) => [res.review, ...prev]);
        setNewReview({ rating: 5, comment: "" });
        setShowForm(false);
      }
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <section className="mt-32 py-24 bg-gradient-to-b from-[#FFF7F9] to-white min-h-screen">
      {/* ================= BREADCRUMB ================= */}
      <div className="max-w-[1300px] mx-auto px-6 mb-10">
        <div className="text-sm text-[#6d4b53] flex items-center gap-2">
          <span className="cursor-pointer hover:text-[#FF76B9] transition">
            Home
          </span>

          <span className="opacity-50">›</span>

          {product.category?.name && (
            <>
              <span className="cursor-pointer hover:text-[#FF76B9] transition">
                {product.category?.name}
              </span>

              <span className="opacity-50">›</span>
            </>
          )}

          <span className="text-[#2b1b1f] font-medium truncate max-w-[250px]">
            {product.name}
          </span>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">
        {/* ================= LEFT IMAGE SECTION ================= */}
        <div className="relative md:sticky md:top-45 self-start">
          <div className="absolute -inset-10 bg-pink-200/20 blur-3xl rounded-full" />

          <div className="relative bg-white p-5 rounded-[40px] shadow-[0_25px_60px_rgba(228,163,177,0.25)]">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full max-h-[500px] object-contain transition duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* ================= RIGHT DETAILS ================= */}
        <div>
          {/* Category */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-3">
            {product.category?.name}
          </p>

          {/* Name */}
          <h1 className="text-[36px] font-serif text-[#2b1b1f] mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6 text-[#FFB800] text-sm">
            ★★★★★{" "}
            <span className="text-[#6d4b53]">({reviews.length}) reviews</span>
          </div>

          {/* Description */}
          <p className="text-[#6d4b53] mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-xl line-through text-[#6d4b53]">
              ₹{product.sale_price}
            </span>
            <span className="text-3xl font-semibold text-[#FF76B9]">
              ₹{product.price}
            </span>
            <span className="text-sm bg-[#e7ffe7] text-green-600 px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <p className="text-sm text-[#2b1b1f] mb-3">Select Size</p>
            <div className="flex gap-2">
              {["30ml", "50ml", "100ml"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded-full text-sm transition ${
                    selectedSize === size
                      ? "bg-[#FF76B9] text-white border-[#FF76B9]"
                      : "border-[#f3d2d9] hover:border-[#FF76B9] cursor-pointer"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center border border-[#f3d2d9] rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2"
              >
                −
              </button>
              <span className="px-6">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="
                py-3 px-15 rounded-full
                bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
                text-white font-medium tracking-wide
                shadow-[0_15px_35px_rgba(255,118,185,0.45)]
                hover:-translate-y-1 transition cursor-pointer
              "
            >
              {cartLoading ? "ADDING..." : "ADD TO CART"}
            </button>
            <button
              onClick={addToWishlist}
              disabled={wishlistLoading}
              className={`
                w-10 h-10 flex items-center justify-center
                rounded-full border transition-all duration-300 cursor-pointer
                ${
                  liked
                    ? "bg-[#FF76B9] border-[#FF76B9] text-white"
                    : "border-[#e4a3b1] text-[#e48fa3] bg-white hover:bg-[#fff1f4]"
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={liked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.255 1.01-4 2.475C11.755 4.76 10.24 3.75 8.5 3.75 6.015 3.75 4 5.765 4 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
                />
              </svg>
            </button>
          </div>

          {/* ================= PRODUCT INFORMATION ACCORDION ================= */}
          <ProductAccordion
            description={product.description}
            ingredients="Alcohol, Parfum (Fragrance), Aqua (Water/Eau)"
          />
          {/* ================= SOCIAL FOLLOW STRIP ================= */}
          <SocialFollow />
        </div>
      </div>

      {/* ================= PERFORMANCE SECTION ================= */}
      <div className="max-w-[1200px] mx-auto px-6 mt-28">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-4">
              PERFORMANCE
            </p>

            <h2 className="text-3xl font-serif text-[#2b1b1f] mb-2">
              Longevity & Sillage
            </h2>

            <p className="text-[#6d4b53] leading-relaxed mb-3">
              These ratings offer guidance on typical wear — how long the
              fragrance remains noticeable and how far it diffuses from the
              wearer. Results may vary based on skin chemistry, environment, and
              application.
            </p>

            <div className="space-y-6 border-t border-[#f3d2d9] pt-6">
              <div>
                <p className="text-sm font-medium text-[#2b1b1f] mb-1">
                  ⏱ Longevity
                </p>
                <p className="text-sm text-[#6d4b53]">
                  Wear time on skin under everyday conditions.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#2b1b1f]">🌫 Sillage</p>
                <p className="text-sm text-[#6d4b53]">
                  The scent’s trail and atmospheric presence.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT RATING CARD */}
          <div className="bg-white rounded-3xl border border-[#f3d2d9] p-8 shadow-[0_20px_45px_rgba(228,163,177,0.2)]">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-6">
              Ratings
            </p>

            {/* Longevity Rating */}
            <RatingBar label="Longevity" score={8} />

            {/* Sillage Rating */}
            <RatingBar label="Sillage" score={6} />

            <p className="text-xs text-[#6d4b53] mt-8 leading-relaxed">
              Longevity and sillage are influenced primarily by a fragrance’s
              note structure and the natural behavior of its raw materials.
              Ratings are intended as guidance rather than a guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* ================= FRAGRANCE FAMILY SECTION ================= */}
      <div className="max-w-[1300px] mx-auto px-6 mt-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-3xl font-serif text-[#2b1b1f] mb-10 ml-5">
          Journey into the Amber Floral fragrance family that brings this scent
          to life.
        </h2>

        {/* Container */}
        <div className="relative rounded-[30px] overflow-hidden shadow-[0_30px_80px_rgba(228,163,177,0.25)]">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />

          {/* Background Image */}
          <img
            src="../src/assets/images/flowers.png"
            alt="Amber Floral"
            className="w-full h-[450px] object-cover"
          />

          {/* Content Card */}
          <div className="absolute z-20 right-10 top-1/2 -translate-y-1/2 bg-[#fff7f9] p-10 rounded-3xl max-w-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-3">
              Fragrance Family
            </p>

            <h3 className="text-2xl font-serif text-[#2b1b1f] mb-4">
              Amber Floral
            </h3>

            <p className="text-[#6d4b53] leading-relaxed mb-6 text-sm">
              Bold and enticing, Amber Floral fuses the rich depth of amber with
              warm Floral. This intoxicating blend creates a dynamic and
              adventurous fragrance, perfect for those seeking warmth and
              mystery.
            </p>

            <button
              onClick={() => navigate("/home-fragrance")}
              className="
                bg-[#2b1b1f] text-white px-6 py-3 rounded-full
                text-sm tracking-wide
                hover:bg-[#FF76B9] transition duration-300
                cursor-pointer
              "
            >
              Explore Amber Floral Scents
            </button>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="max-w-[1300px] mx-auto px-6 mt-25">
        <h2 className="text-2xl font-serif text-[#2b1b1f] mb-12 text-center">
          Our Picks for You
        </h2>

        {relatedLoading ? (
          <p className="text-center text-sm text-[#6d4b53]">
            Loading related products…
          </p>
        ) : relatedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6d4b53]">No related products available.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-10">
            {relatedProducts.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  actualPrice: item.sale_price,
                  salePrice: item.price,
                  image: item.image_url,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= FRAGRANCE PYRAMID SECTION ================= */}
      <div className="max-w-[1300px] mx-auto px-6 mt-15">
        <div className="grid md:grid-cols-2 gap-20 items-center ml-20">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-4">
              Fragrance Structure
            </p>

            <h2 className="text-3xl font-serif text-[#2b1b1f] mb-8">
              The Olfactory Pyramid
            </h2>

            <ul className="space-y-6 text-[#6d4b53] text-lg">
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-3 rounded-full bg-[#FF76B9]" />
                <div className="text-[15px]">
                  <span className="text-[16px] font-medium text-[#2b1b1f]">
                    Top Notes:
                  </span>{" "}
                  Agarwood, Lavender, Spicy
                </div>
              </li>

              <li className="flex gap-4">
                <span className="w-2 h-2 mt-3 rounded-full bg-[#c48b5a]" />
                <div className="text-[15px]">
                  <span className="text-[16px] font-medium text-[#2b1b1f]">
                    Middle Notes:
                  </span>{" "}
                  Incense, Floral, Cedarwood
                </div>
              </li>

              <li className="flex gap-4">
                <span className="w-2 h-2 mt-3 rounded-full bg-[#2b1b1f]" />
                <div className="text-[15px]">
                  <span className="text-[16px] font-medium text-[#2b1b1f]">
                    Base Notes:
                  </span>{" "}
                  Oud, Moss, Ambergris
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT PYRAMID IMAGE */}
          <div className="relative flex justify-center">
            <img
              src="../src/assets/images/moredetails.png"
              alt="Fragrance Notes"
              className="
                relative z-10
                w-[400px]
              "
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 mt-15">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-serif text-[#2b1b1f]">
            Customer Reviews ({reviews.length})
          </h2>

          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC] text-white text-sm shadow-md cursor-pointer"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        {reviewLoading ? (
          <p className="text-sm text-[#6d4b53]">Loading reviews...</p>
        ) : reviews?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6d4b53] text-sm mb-3">
              No reviews yet for this fragrance.
            </p>

            <p className="text-xs text-[#a07a83]">
              Be the first to share your experience.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {paginatedReviews.map((review) => (
              <div
                key={review.id}
                className="
                bg-white
                border border-[#f3d2d9]
                rounded-3xl
                p-8
                shadow-[0_15px_40px_rgba(228,163,177,0.18)]
                hover:shadow-[0_25px_60px_rgba(228,163,177,0.28)]
                transition duration-300
              "
              >
                {/* Header Row */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < review.rating
                              ? "text-[#c48b5a]"
                              : "text-[#f3d2d9]"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Name + Verified */}
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-[#2b1b1f]">
                        {review.user?.name || "Anonymous"}
                      </p>

                      <span className="text-[10px] tracking-wider uppercase bg-[#e7ffe7] text-green-600 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    </div>

                    <p className="text-xs text-[#6d4b53] mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Helpful */}
                  <button
                    className="
                    text-xs text-[#6d4b53]
                    border border-[#f3d2d9]
                    px-3 py-1 rounded-full
                    hover:bg-[#fff1f4]
                    transition
                  "
                  >
                    Helpful
                  </button>
                </div>

                {/* Review Text */}
                <p className="text-[15px] text-[#6d4b53] leading-relaxed">
                  {review.comment}
                </p>

                {/* Divider Accent */}
                <div className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#f3d2d9] to-transparent" />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`w-8 h-8 rounded-md text-sm transition ${
                  page === index + 1
                    ? "bg-[#c48b5a] text-white"
                    : "border border-[#e4a3b1] text-[#2b1b1f] hover:bg-[#fbe3e8] cursor-pointer"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="max-w-[1300px] mx-auto px-6 mt-20">
        <h2 className="text-2xl font-serif text-[#2b1b1f] mb-12 text-center">
          Explore New Arrivals
        </h2>

        {newArrivalLoading ? (
          <p className="text-center text-sm text-[#6d4b53]">
            Loading related products…
          </p>
        ) : newArrivals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6d4b53]"> No new arrivals available.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-10">
            {newArrivals.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  actualPrice: item.sale_price,
                  salePrice: item.price,
                  image: item.image_url,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= REVIEW MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />

          {/* Modal Card */}
          <div
            className="
                relative z-10
                w-[90%] max-w-[500px]
                bg-white
                rounded-3xl
                p-10
                shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                animate-[fadeIn_0.3s_ease]
              "
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-5 text-xl text-[#6d4b53] hover:text-[#FF76B9] cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-serif text-[#2b1b1f] mb-6">
              Write Your Review
            </h3>

            <div className="space-y-5">
              {/* Rating */}
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
                className="w-full border border-[#f1cfd6] rounded-xl p-3 text-sm focus:outline-none focus:border-[#FF76B9]"
              >
                <option value="5">★★★★★ (5 Stars)</option>
                <option value="4">★★★★☆ (4 Stars)</option>
                <option value="3">★★★☆☆ (3 Stars)</option>
                <option value="2">★★☆☆☆ (2 Stars)</option>
                <option value="1">★☆☆☆☆ (1 Star)</option>
              </select>

              {/* Comment */}
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Share your experience..."
                rows="4"
                className="w-full border border-[#f1cfd6] rounded-xl p-4 text-sm focus:outline-none focus:border-[#FF76B9]"
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="
                    w-full py-3 rounded-full
                    bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
                    text-white text-sm
                    shadow-[0_12px_30px_rgba(255,118,185,0.35)]
                    hover:-translate-y-1 transition
                  "
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= Rating Bar ================= */

function RatingBar({ label, score }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[#2b1b1f] font-medium">{label}</span>
        <span className="text-[#6d4b53]">{score}/10</span>
      </div>

      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${
              i < score ? "bg-[#c48b5a]" : "bg-[#f3d2d9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductAccordion({ description, ingredients }) {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  const Item = ({ title, id, children }) => {
    const isOpen = open === id;

    return (
      <div className="border-b border-[#f3d2d9]">
        <button
          onClick={() => toggle(id)}
          className="w-full flex justify-between items-center py-6 cursor-pointer"
        >
          <span className="text-sm tracking-[0.15em] uppercase text-[#2b1b1f]">
            {title}
          </span>

          {/* Animated + Icon */}
          <span
            className={`
              text-[#FF76B9] text-xl
              transition-transform duration-300
              ${isOpen ? "rotate-45" : "rotate-0"}
            `}
          >
            +
          </span>
        </button>

        {/* Animated Content */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="pb-6 text-sm text-[#6d4b53] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12 border-t border-[#f3d2d9]">
      <Item title="Description" id="description">
        {description}
      </Item>

      <Item title="Ingredients" id="ingredients">
        {ingredients}
      </Item>

      <Item title="Shipping & Handling" id="shipping">
        Orders are processed within 1–2 business days. Free shipping on orders
        above ₹1999. Standard delivery: 3–5 working days.
      </Item>

      <Item title="Returns" id="returns">
        We offer a 7-day easy return policy. Products must be unused and in
        original packaging.
      </Item>
    </div>
  );
}

function SocialFollow() {
  const socials = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      url: "https://www.facebook.com/profile.php?id=61573993740603",
    },
    {
      name: "X",
      icon: "fab fa-x-twitter",
      url: "https://x.com/The_Evah",
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      url: "https://www.instagram.com/e_vah_/",
    },
    {
      name: "linkedin",
      icon: "fab fa-linkedin",
      url: "https://www.linkedin.com/company/evah-fragrance/",
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      url: "https://www.youtube.com/@EvahEssence",
    },
  ];

  return (
    <div className="mt-2 pt-2">
      <div className="flex justify-left gap-4">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group cursor-pointer"
          >
            {/* Tooltip */}
            <div
              className="
                absolute -top-10 left-1/2 -translate-x-1/2
                bg-[#2b1b1f] text-white text-xs px-3 py-1
                rounded-md opacity-0 group-hover:opacity-100
                transition-all duration-300
                whitespace-nowrap
              "
            >
              Follow on {social.name}
            </div>

            {/* Icon */}
            <div
              className="
                w-7 h-7 flex items-center justify-center
                text-[#2b1b1f]
                hover:text-[#FF76B9]
                transition duration-300
                text-lg
              "
            >
              <i className={social.icon}></i>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
