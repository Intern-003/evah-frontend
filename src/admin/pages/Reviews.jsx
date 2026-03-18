import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ReviewsAdmin() {
  const { data, loading, refetch } = useGet("reviews");

  const { executeDelete } = useDelete();

  const [deletingId, setDeletingId] = useState(null);

  const reviews = data?.reviews || [];

  /* ================= ANALYTICS ================= */

  const totalReviews = reviews.length;

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  const positiveReviews = reviews.filter((r) => r.rating >= 4).length;

  const lowReviews = reviews.filter((r) => r.rating <= 2).length;

  /* ================= STAR RENDER ================= */

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  /* ================= DELETE REVIEW ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this review?");

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await executeDelete(`reviews/${id}`);

      toast.success("Review deleted");

      refetch();
    } catch (err) {
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-[#FF76B9]">
          <span className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm">Loading reviews...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-serif text-[#2b1b1f]">Reviews Overview</h1>

        <p className="text-sm text-[#8b6a72] mt-1">
          Monitor customer feedback and ratings.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-6">
        <Stat title="TOTAL REVIEWS" value={totalReviews} />

        <Stat title="AVERAGE RATING" value={`${avgRating.toFixed(1)} ⭐`} />

        <Stat title="POSITIVE REVIEWS" value={positiveReviews} />

        <Stat title="LOW RATINGS" value={lowReviews} />
      </div>

      {/* REVIEWS TABLE */}

      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="bg-[#fff1f4] px-5 py-3 text-xs tracking-widest text-[#2b1b1f]">
          CUSTOMER REVIEWS
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white border-b border-[#f3d2d9]">
              <tr>
                <th className="px-5 py-3 text-left">Customer</th>

                <th className="px-5 py-3 text-left">Product</th>

                <th className="px-5 py-3 text-left">Rating</th>

                <th className="px-5 py-3 text-left">Review</th>

                <th className="px-5 py-3 text-left">Date</th>

                <th className="px-5 py-3 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {reviews.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-[#a07a83]">
                    No reviews found
                  </td>
                </tr>
              )}

              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-[#f3d2d9]">
                  {/* USER */}

                  <td className="px-5 py-3 font-medium text-[#2b1b1f]">
                    {review.user?.name}
                  </td>

                  {/* PRODUCT */}

                  <td className="px-5 py-3">{review.product?.name}</td>

                  {/* RATING */}

                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </td>

                  {/* COMMENT */}

                  <td className="px-5 py-3 text-[#6d4b53]">{review.comment}</td>

                  {/* DATE */}

                  <td className="px-5 py-3 text-[#8b6a72]">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>

                  {/* DELETE */}

                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={deletingId === review.id}
                      className="text-xs px-3 py-1 rounded-md bg-red-500 text-white hover:opacity-90 transition cursor-pointer"
                    >
                      {deletingId === review.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function Stat({ title, value }) {
  return (
    <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
      <p className="text-xs tracking-widest text-[#a07a83]">{title}</p>

      <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">{value}</h2>
    </div>
  );
}
