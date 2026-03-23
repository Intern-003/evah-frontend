import React, { useState } from "react";
import { useGet } from "../hooks/useGet";

/* ---------------- MAIN COMPONENT ---------------- */

export default function Reviews() {
  const { data, loading } = useGet("reviews");

  const reviewsData = data?.reviews || [];

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 3;

  /* Filter logic */
  const filteredReviews =
    filter === "all"
      ? reviewsData
      : reviewsData.filter((r) => r.rating === Number(filter));

  /* Pagination logic */
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  if (loading) {
    return <ReviewsSkeleton />;
  }

  /* Reset page when filter changes */
  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <section className="bg-[#FFF8FA] py-24 mt-24">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-[32px] text-[#2b1b1f] mb-4">
            Customer Testimonials
          </h1>

          <div className="flex justify-center items-center gap-3 mb-2">
            <span className="text-[42px] font-medium text-[#c48b5a]">4.5</span>
            <Stars rating={4.5} />
          </div>

          <p className="text-sm text-[#6d4b53]">Based on 2048 reviews</p>
        </div>

        {/* ===== FILTER ===== */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-medium text-[#2b1b1f]">
            Product Reviews
          </h3>

          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-[#e4a3b1] rounded-full px-4 py-2 text-sm bg-white"
          >
            <option value="all">Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <hr className="border-[#f1cfd6] mb-10" />

        {/* ===== REVIEWS LIST ===== */}
        <div className="space-y-10">
          {paginatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-8 h-8 rounded-md text-sm transition ${
                  n === currentPage
                    ? "bg-[#c48b5a] text-white"
                    : "border border-[#e4a3b1] text-[#2b1b1f] hover:bg-[#fbe3e8]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- REVIEW CARD ---------------- */

function ReviewCard({ review }) {
  return (
    <div className="pb-10 border-b border-[#f1cfd6]">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#e4a3b1]/40 flex items-center justify-center text-sm font-medium text-[#2b1b1f]">
            {review.user?.name[0]}
          </div>

          <div>
            <p className="text-sm font-medium text-[#2b1b1f]">
              {review.user?.name || "Guest"}
            </p>

            {review.verified && (
              <p className="text-xs text-[#b88994]">Verified Buyer</p>
            )}
          </div>
        </div>

        <p className="text-xs text-[#6d4b53]">
          {new Date(review.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-3">
        <Stars rating={review.rating} />
        <p className="text-sm font-medium text-[#2b1b1f]">{review.title}</p>
      </div>

      {/* Review Text */}
      <p className="mt-3 text-sm leading-[1.8] text-[#6d4b53] max-w-[900px]">
        {review.text}
      </p>

      <p className="mt-2 text-xs text-[#6d4b53]">
        Product Reviewed:{" "}
        <span className="text-[#2b1b1f] font-medium">{review.comment}</span>
      </p>

      {/* Helpful */}
      <div className="mt-4 flex justify-end text-xs text-[#6d4b53] gap-3">
        Was this review helpful?
        <button className="hover:text-[#2b1b1f]">👍 0</button>
        <button className="hover:text-[#2b1b1f]">👎 0</button>
      </div>
    </div>
  );
}

/* ---------------- STARS ---------------- */

function Stars({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-lg ${
            i <= rating ? "text-[#ff7a18]" : "text-[#f1cfd6]"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ---------------- Skeleton ---------------- */

function ReviewsSkeleton() {
  return (
    <section className="bg-[#FFF8FA] py-24 mt-24 animate-pulse">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="h-8 w-64 bg-[#efc6d4] rounded mx-auto mb-4"></div>

          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="h-10 w-12 bg-[#efc6d4] rounded"></div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-[#f6dce4] rounded"></div>
              ))}
            </div>
          </div>

          <div className="h-3 w-40 bg-[#f6dce4] rounded mx-auto"></div>
        </div>

        {/* FILTER */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-4 w-32 bg-[#efc6d4] rounded"></div>
          <div className="h-9 w-32 bg-[#f6dce4] rounded-full"></div>
        </div>

        <hr className="border-[#f1cfd6] mb-10" />

        {/* REVIEWS LIST */}
        <div className="space-y-10">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="pb-10 border-b border-[#f1cfd6]">
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f6dce4]"></div>

                  <div>
                    <div className="h-3 w-24 bg-[#efc6d4] rounded mb-2"></div>
                    <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
                  </div>
                </div>

                <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
              </div>

              {/* RATING */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[#f6dce4] rounded"></div>
                  ))}
                </div>
                <div className="h-3 w-32 bg-[#efc6d4] rounded"></div>
              </div>

              {/* TEXT */}
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full bg-[#f6dce4] rounded"></div>
                <div className="h-3 w-[90%] bg-[#f6dce4] rounded"></div>
                <div className="h-3 w-[70%] bg-[#f6dce4] rounded"></div>
              </div>

              {/* PRODUCT */}
              <div className="mt-3 h-3 w-40 bg-[#f6dce4] rounded"></div>

              {/* ACTIONS */}
              <div className="mt-4 flex justify-end gap-3">
                <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
                <div className="h-3 w-20 bg-[#f6dce4] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
