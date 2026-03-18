import { useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import toast from "react-hot-toast";

export default function AllCategory() {
  const { data, loading, refetch } = useGet("admin/categories");
  const { executeDelete } = useDelete();

  const [deletingId, setDeletingId] = useState(null);

  const categories = data?.categories || [];

  /* ================= BUILD CATEGORY TREE ================= */

  const buildCategoryTree = (categories) => {
    const map = {};
    const roots = [];

    categories.forEach((cat) => {
      map[cat.id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
      if (cat.parent_id) {
        map[cat.parent_id]?.children.push(map[cat.id]);
      } else {
        roots.push(map[cat.id]);
      }
    });

    return roots;
  };

  const categoryTree = buildCategoryTree(categories);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this category?");

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await executeDelete(`admin/categories/${id}`);

      toast.success("Category deleted");

      refetch();

      window.dispatchEvent(new Event("categoryUpdated"));
    } catch (err) {
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  /* ================= RENDER TREE ================= */

  const renderCategories = (nodes, level = 0) => {
    return nodes.map((cat) => (
      <div key={cat.id}>
        {/* CATEGORY ROW */}
        <div className="border-b border-[#f3d2d9] py-3 flex items-center justify-between">
          {/* NAME */}
          <div
            className="flex items-center gap-2"
            style={{ marginLeft: level * 20 }}
          >
            {level > 0 && <span className="text-[#c48b5a]">↳</span>}

            <span className="text-sm text-[#2b1b1f] font-medium">
              {cat.name}
            </span>
          </div>

          {/* ACTION */}
          <button
            onClick={() => handleDelete(cat.id)}
            disabled={deletingId === cat.id}
            className="text-xs px-3 py-1 rounded-md bg-red-500 text-white hover:opacity-90 transition cursor-pointer"
          >
            {deletingId === cat.id ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* CHILDREN */}
        {cat.children?.length > 0 && renderCategories(cat.children, level + 1)}
      </div>
    ));
  };

  if (loading) {
    return <p className="text-sm text-[#6d4b53]">Loading categories...</p>;
  }

  return (
    <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
      {/* HEADER */}
      <div className="bg-[#fff1f4] px-4 py-3 text-xs tracking-widest text-[#2b1b1f]">
        CATEGORY STRUCTURE
      </div>

      {/* LIST */}
      <div className="max-h-[420px] overflow-y-auto px-4">
        {categories.length === 0 && (
          <div className="py-10 text-center text-sm text-[#a07a83]">
            No categories found
          </div>
        )}

        {renderCategories(categoryTree)}
      </div>
    </div>
  );
}
