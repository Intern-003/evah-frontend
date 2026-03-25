import { useGet } from "../../hooks/useGet";

export default function Products() {
  const { data, loading } = useGet("products");

  const products = data?.products || [];

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-[#FF76B9]">
          <span className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm">Loading products...</span>
        </div>
      </div>
    );
  }

  /* ================= ANALYTICS ================= */

  const totalProducts = products.length;

  const saleProducts = products.filter(
    (p) => p.sale_price && p.sale_price < p.price,
  ).length;

  const avgPrice =
    products.reduce((sum, p) => sum + Number(p.price || 0), 0) /
    (products.length || 1);

  const categoryCount = {};

  products.forEach((p) => {
    const cat = p.category?.name || "Other";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-serif text-[#2b1b1f]">
          Products Overview
        </h1>

        <p className="text-sm text-[#8b6a72] mt-1">
          View and analyze all products in the store.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        {/* TOTAL PRODUCTS */}
        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">
            TOTAL PRODUCTS
          </p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {totalProducts}
          </h2>
        </div>

        {/* SALE PRODUCTS */}
        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">
            PRODUCTS ON SALE
          </p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {saleProducts}
          </h2>
        </div>

        {/* AVG PRICE */}
        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">
            AVERAGE PRICE
          </p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            ₹{Math.round(avgPrice)}
          </h2>
        </div>
      </div>

      {/* CATEGORY DISTRIBUTION */}
      <div className="bg-white border border-[#f3d2d9] rounded-xl p-6">
        <h2 className="text-lg font-medium text-[#2b1b1f] mb-4">
          Category Distribution
        </h2>

        <div className="space-y-3">
          {Object.entries(categoryCount).map(([cat, count]) => (
            <div
              key={cat}
              className="flex justify-between text-sm text-[#2b1b1f]"
            >
              <span>{cat}</span>

              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="bg-[#fff1f4] px-5 py-3 text-xs tracking-widest text-[#2b1b1f]">
          PRODUCTS LIST
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white border-b border-[#f3d2d9]">
              <tr>
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Sale Price</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-sm text-[#a07a83]"
                  >
                    No products found
                  </td>
                </tr>
              )}

              {products.map((product) => (
                <tr key={product.id} className="border-t border-[#f3d2d9]">
                  {/* IMAGE */}
                  <td className="px-5 py-3">
                    <img
                      // src={product.image_url}
                      src={product.image_url.replace(
                        "/evah_backend/storage",
                        "/evah_backend/public/storage",
                      )}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-[#f3d2d9]"
                    />
                  </td>

                  {/* NAME */}
                  <td className="px-5 py-3 font-medium text-[#2b1b1f]">
                    {product.name}
                  </td>

                  {/* CATEGORY */}
                  <td className="px-5 py-3">{product.category?.name || "-"}</td>

                  {/* PRICE */}
                  <td className="px-5 py-3">₹{product.price}</td>

                  {/* SALE PRICE */}
                  <td className="px-5 py-3">
                    {product.sale_price ? (
                      <span className="text-green-600">
                        ₹{product.sale_price}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTICE */}
      <div className="bg-[#fff7f9] border border-[#f3d2d9] rounded-xl p-5 text-sm text-[#6d4b53]">
        <span className="font-medium text-[#2b1b1f]">
          Product Management Notice
        </span>

        <p className="mt-1">
          Products cannot be edited from this admin panel. To add, update or
          delete products please use the
          <span className="font-medium text-[#FF76B9]">
            {" "}
            Products Management on the homepage.
          </span>
        </p>
      </div>
    </div>
  );
}
