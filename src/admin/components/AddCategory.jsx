import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { usePost } from "../../hooks/usePost";
import { useGet } from "../../hooks/useGet";

export default function AddCategory() {
  const { execute, loading } = usePost("admin/categories");

  const {
    data: categoryData,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useGet("admin/categories");

  const categories = categoryData?.categories || [];

  /* ===== ONLY MAIN CATEGORIES ===== */

  const mainCategories = categories.filter((cat) => !cat.parent_id);

  const [form, setForm] = useState({
    name: "",
    parent_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      toast.error("Category name required");
      return;
    }

    try {
      const res = await execute({
        name: form.name,
        parent_id: form.parent_id || null,
      });

      toast.success(res.message || "Category added");

      /* REFRESH CATEGORY LIST */

      window.dispatchEvent(new Event("categoryUpdated"));

      setForm({
        name: "",
        parent_id: "",
      });
    } catch (err) {
      if (err?.errors) {
        Object.values(err.errors).forEach((e) => {
          toast.error(e[0]);
        });
      } else {
        toast.error("Failed to add category");
      }
    }
  };

  /* ===== AUTO REFRESH CATEGORIES ===== */

  useEffect(() => {
    const updateCategories = () => {
      refetchCategories();
    };

    window.addEventListener("categoryUpdated", updateCategories);

    return () => {
      window.removeEventListener("categoryUpdated", updateCategories);
    };
  }, [refetchCategories]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* CATEGORY NAME */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Category Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter category name"
          className="
            w-full
            border border-[#f1cfd6]
            rounded-xl
            px-4 py-3
            text-sm
            focus:border-[#FF76B9]
            focus:ring-2 focus:ring-[#FF76B9]/20
            outline-none
          "
        />
      </div>

      {/* PARENT CATEGORY */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Parent Category
        </label>

        <select
          name="parent_id"
          value={form.parent_id}
          onChange={handleChange}
          className="
            w-full
            border border-[#f1cfd6]
            rounded-xl
            px-4 py-3
            text-sm
            focus:border-[#FF76B9]
            focus:ring-2 focus:ring-[#FF76B9]/20
            outline-none
          "
        >
          <option value="">None (Main Category)</option>

          {categoryLoading ? (
            <option>Loading categories...</option>
          ) : (
            mainCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={loading}
        className="
          w-full
          py-3
          rounded-full
          bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
          text-white
          tracking-[0.25em]
          text-sm
          shadow-[0_12px_30px_rgba(255,118,185,0.45)]
          hover:-translate-y-[2px]
          transition
        "
      >
        {loading ? "ADDING..." : "ADD CATEGORY"}
      </button>
    </form>
  );
}
