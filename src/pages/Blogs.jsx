import { useState } from "react";

/* ================= MOCK BLOG DATA ================= */
const blogData = [
  {
    id: 1,
    title: "How to Choose the Perfect Signature Scent",
    category: "Fragrance Guide",
    date: "January 15, 2026",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f",
  },
  {
    id: 2,
    title: "Layering Perfumes Like a Pro",
    category: "Expert Tips",
    date: "January 10, 2026",
    image: "https://images.unsplash.com/photo-1585386959984-a4155228c9c4",
  },
  {
    id: 3,
    title: "The Art of Gifting Luxury Fragrances",
    category: "Gifting",
    date: "January 5, 2026",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    id: 4,
    title: "Understanding Notes: Top, Heart & Base",
    category: "Education",
    date: "December 28, 2025",
    image: "https://images.unsplash.com/photo-1619995745882-f4128ac82ad6",
  },
  {
    id: 5,
    title: "Attars vs Perfumes – What’s the Difference?",
    category: "Education",
    date: "December 20, 2025",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569",
  },
  {
    id: 6,
    title: "Attars vs Perfumes – What’s the Difference?",
    category: "Education",
    date: "December 20, 2025",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569",
  },
];

/* ================= COMPONENT ================= */

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(blogData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogData.slice(start, start + itemsPerPage);

  return (
    <section className="bg-gradient-to-b from-[#FFF7F9] to-white py-32 mt-20">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* ===== HERO ===== */}
        <div className="text-center mb-24">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            EVAH JOURNAL
          </p>

          <h1 className="font-serif text-[42px] md:text-[50px] text-[#2b1b1f] mb-6">
            Stories of Scent & Style
          </h1>

          <p className="max-w-[760px] mx-auto text-[15px] leading-[1.9] text-[#6d4b53]">
            Discover fragrance guides, layering tips, gifting ideas, and the art
            behind every bottle of EVAH.
          </p>
        </div>

        {/* ===== FEATURED BLOG ===== */}
        <div className="mb-24">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(228,163,177,0.3)]">
            <img
              src={blogData[0].image}
              alt={blogData[0].title}
              className="w-full h-[420px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white max-w-[600px]">
              <p className="text-[11px] tracking-[0.25em] uppercase mb-2">
                {blogData[0].category}
              </p>
              <h2 className="font-serif text-[28px] mb-3">
                {blogData[0].title}
              </h2>
              <p className="text-sm opacity-90">{blogData[0].date}</p>
            </div>
          </div>
        </div>

        {/* ===== BLOG GRID ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedBlogs.slice(1).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= BLOG CARD ================= */

function BlogCard({ blog }) {
  return (
    <div
      className="
      bg-white rounded-3xl overflow-hidden
      border border-[#f1cfd6]
      shadow-[0_16px_35px_rgba(228,163,177,0.18)]
      transition-all duration-500
      hover:-translate-y-2
      hover:shadow-[0_26px_55px_rgba(228,163,177,0.35)]
    "
    >
      <div className="h-[240px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition duration-700 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#b88994] mb-2">
          {blog.category}
        </p>

        <h3 className="font-serif text-[18px] text-[#2b1b1f] mb-3">
          {blog.title}
        </h3>

        <p className="text-sm text-[#6d4b53]">{blog.date}</p>
      </div>
    </div>
  );
}
