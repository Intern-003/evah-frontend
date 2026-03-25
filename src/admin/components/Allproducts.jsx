import { useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import toast from "react-hot-toast";

export default function Allproducts() {
  const { data, loading, refetch } = useGet("products");

  const { executeDelete } = useDelete();

  const [deletingId, setDeletingId] = useState(null);

  const products = data?.products || [];

  /* ================= DELETE PRODUCT ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await executeDelete(`admin/products/${id}`);

      toast.success("Product deleted successfully");

      refetch();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-[#6d4b53]">Loading products...</p>;
  }

  return (
    <div className="space-y-4">
      {/* TABLE WRAPPER */}
      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full">
            {/* HEADER */}
            <thead className="bg-[#fff1f4] text-left text-xs tracking-widest text-[#2b1b1f] sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Sale_Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Delete</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-sm text-[#a07a83]"
                  >
                    No products found
                  </td>
                </tr>
              )}

              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-[#f3d2d9] text-sm text-[#2b1b1f]"
                >
                  {/* IMAGE */}
                  <td className="px-4 py-3">
                    <img
                      // src={product.image_url || "/placeholder.png"}
                      src={product.image_url.replace(
                        "/evah_backend/storage",
                        "/evah_backend/public/storage",
                      )}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border border-[#f3d2d9]"
                    />
                  </td>

                  {/* NAME */}
                  <td className="px-4 py-3 font-medium">{product.name}</td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3">{product.category?.name || "-"}</td>

                  {/* PRICE */}
                  <td className="px-4 py-3">₹{product.sale_price}</td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    {product.is_active ? (
                      <span className="text-green-600 text-xs">Active</span>
                    ) : (
                      <span className="text-red-500 text-xs">Inactive</span>
                    )}
                  </td>

                  {/* DELETE */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="text-xs px-3 py-1 rounded-md bg-red-500 text-white hover:opacity-90 transition cursor-pointer"
                    >
                      {deletingId === product.id ? "Deleting..." : "Delete"}
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
