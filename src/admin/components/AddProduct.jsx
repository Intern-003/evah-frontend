import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { usePost } from "../../hooks/usePost";
import { useGet } from "../../hooks/useGet";

export default function AddProduct() {
  const { execute, loading } = usePost("admin/products");

  const {
    data: categoryData,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useGet("admin/categories");

  const categories = categoryData?.categories || [];

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

  const renderCategoryOptions = (nodes, level = 0) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <option value={node.id}>
          {"— ".repeat(level)}
          {node.name}
        </option>

        {node.children?.length > 0 &&
          renderCategoryOptions(node.children, level + 1)}
      </React.Fragment>
    ));
  };

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    type: "",
    longevity: "",
    price: "",
    sale_price: "",
    description: "",
    is_active: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category_id", form.category_id);
      formData.append("type", form.type);
      formData.append("longevity", form.longevity);
      formData.append("price", form.price);
      formData.append("sale_price", form.sale_price);
      formData.append("description", form.description);
      formData.append("is_active", form.is_active ? 1 : 0);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await execute(formData);

      toast.success(res.message || "Product added successfully");

      setForm({
        name: "",
        category_id: "",
        type: "",
        longevity: "",
        price: "",
        sale_price: "",
        description: "",
        is_active: true,
        image: null,
      });

      setPreview(null);
    } catch (err) {
      console.log(err);

      if (err?.errors) {
        Object.values(err.errors).forEach((e) => {
          toast.error(e[0]);
        });
      } else {
        toast.error("Failed to add product");
      }
    }
  };

  useEffect(() => {
    const updateCategories = () => {
      refetchCategories();
    };

    window.addEventListener("categoryUpdated", updateCategories);

    return () => {
      window.removeEventListener("categoryUpdated", updateCategories);
    };
  }, [refetchCategories]);

  const input = `
    w-full
    border border-[#f1cfd6]
    bg-white
    rounded-xl
    px-4 py-3
    text-sm
    outline-none
    focus:border-[#FF76B9]
    focus:ring-2 focus:ring-[#FF76B9]/20
    transition
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PRODUCT NAME */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className={input}
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Category
        </label>

        {/* <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className={input}
            >
            <option value="">Select Category</option>

            {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                {cat.name}
                </option>
            ))}
        </select> */}
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className={input}
        >
          <option value="">Select Category</option>

          {renderCategoryOptions(categoryTree)}
        </select>
      </div>

      {/* TYPE */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Perfume Type
        </label>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className={input}
        >
          <option value="">Select Type</option>
          <option value="Eau De Parfum">Eau De Parfum</option>
          <option value="Eau De Toilette">Eau De Toilette</option>
          <option value="Eau De Cologne">Eau De Cologne</option>
          <option value="Perfume Oil">Perfume Oil</option>
          <option value="Floral">Floral</option>
          <option value="Woody">Woody</option>
          <option value="Oriental">Oriental</option>
          <option value="Fresh">Fresh</option>
          <option value="Citrus">Citrus</option>
          <option value="Spicy">Spicy</option>
          <option value="Sweet">Sweet</option>
          <option value="Vanilla">Vanilla</option>
          <option value="Rose">Rose</option>
          <option value="Oud">Oud</option>
          <option value="Musk">Musk</option>
          <option value="Amber">Amber</option>
          <option value="Sandalwood">Sandalwood</option>
          <option value="Jasmine">Jasmine</option>
          <option value="Daily Wear">Daily Wear</option>
          <option value="Office">Office</option>
          <option value="Party">Party</option>
          <option value="Date Night">Date Night</option>
          <option value="Wedding">Wedding</option>
        </select>
      </div>

      {/* LONGEVITY */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Longevity ( optional )
        </label>

        <select
          name="longevity"
          value={form.longevity}
          onChange={handleChange}
          className={input}
        >
          <option value="">Select Longevity</option>
          <option value="4–6 Hours">4–6 Hours</option>
          <option value="6–8 Hours">6–8 Hours</option>
          <option value="8–12 Hours">8–12 Hours</option>
          <option value="12+ Hours">12+ Hours</option>
        </select>
      </div>

      {/* PRICE */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className={input}
          />
        </div>

        <div>
          <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
            Sale Price
          </label>

          <input
            type="number"
            name="sale_price"
            value={form.sale_price}
            onChange={handleChange}
            placeholder="Enter Sale price"
            className={input}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm mb-2 font-medium text-[#2b1b1f]">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows="4"
          className={input}
        />
      </div>

      {/* IMAGE */}
      <div>
        <label className="block text-sm mb-3 font-medium text-[#2b1b1f]">
          Product Image
        </label>

        <div
          className="
            border-2 border-dashed border-[#f3d2d9]
            rounded-2xl p-6
            bg-[#fff7f9]
            hover:border-[#FF76B9]
            transition
            flex flex-col items-center justify-center
            cursor-pointer
            relative
            "
        >
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {!preview && (
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#FF76B9] mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 014-4h.26A8 8 0 1121 12v3m-9-3v6m0 0l-3-3m3 3l3-3"
                />
              </svg>

              <p className="text-sm text-[#6d4b53]">
                Click to upload product image
              </p>

              <p className="text-xs text-[#a07a83] mt-1">
                PNG, JPG, WEBP up to 2MB
              </p>
            </div>
          )}

          {preview && (
            <div className="flex flex-col items-center">
              <img
                src={preview}
                className="
                    w-[140px] h-[140px]
                    object-cover
                    rounded-xl
                    shadow-[0_15px_35px_rgba(228,163,177,0.35)]
                    border border-[#f3d2d9]
                "
              />

              <span className="text-xs text-[#6d4b53] mt-3">
                Click to change image
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ACTIVE */}

      <div className="flex items-center justify-between bg-[#fff7f9] border border-[#f3d2d9] rounded-xl px-4 py-3">
        <span className="text-sm font-medium text-[#2b1b1f]">
          {form.is_active ? "Active Product" : "Inactive Product"}
        </span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            className="sr-only peer"
          />

          <div
            className="
                w-11 h-6
                bg-[#f3d2d9]
                rounded-full
                peer
                peer-checked:bg-[#FF76B9]
                transition
            "
          ></div>

          <div
            className="
                absolute left-1 top-1
                w-4 h-4
                bg-white
                rounded-full
                shadow
                transition
                peer-checked:translate-x-5
            "
          ></div>
        </label>
      </div>

      {/* SUBMIT */}
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
        {loading ? "ADDING..." : "ADD PRODUCT"}
      </button>
    </form>
  );
}
