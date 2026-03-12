import React from "react";

export default function FiltersSidebar({ filters, setFilters }) {
  const toggleCheckbox = (type, value) => {
    setFilters((prev) => {
      const arr = prev[type] || [];
      return {
        ...prev,
        [type]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const clearFilters = () => setFilters({});

  return (
    <aside className="w-[280px] bg-[#fafafa] border border-[#eee] rounded-2xl p-6 h-fit">
      {/* Heading */}
      <h3 className="text-[18px] font-serif font-semibold mb-6">Filters</h3>

      {/* ================= PRICE ================= */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3">Max Price</h4>

        <input
          type="range"
          min="0"
          max="20000"
          value={filters.maxPrice || 20000}
          // onChange={(e) =>
          //   setFilters((p) => ({ ...p, maxPrice: e.target.value }))
          // }
          onChange={(e) =>
            setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-[#a36b74]"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹{filters.maxPrice || 20000}</span>
        </div>
      </div>

      {/* ================= FRAGRANCE TYPE ================= */}
      <Section title="Fragrance Type">
        {[
          "Eau De Parfum",
          "Eau De Toilette",
          "Eau De Cologne",
          "Perfume Oil",
        ].map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={filters.type?.includes(item)}
            onChange={() => toggleCheckbox("type", item)}
          />
        ))}
      </Section>

      {/* ================= SCENT FAMILY ================= */}
      <Section title="Scent Family">
        {[
          "Floral",
          "Woody",
          "Oriental",
          "Fresh",
          "Citrus",
          "Spicy",
          "Sweet",
        ].map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={filters.family?.includes(item)}
            onChange={() => toggleCheckbox("family", item)}
          />
        ))}
      </Section>

      {/* ================= NOTES ================= */}
      <Section title="Notes">
        {[
          "Vanilla",
          "Rose",
          "Oud",
          "Musk",
          "Amber",
          "Sandalwood",
          "Jasmine",
        ].map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={filters.notes?.includes(item)}
            onChange={() => toggleCheckbox("notes", item)}
          />
        ))}
      </Section>

      {/* ================= OCCASION ================= */}
      <Section title="Occasion">
        {["Daily Wear", "Office", "Party", "Date Night", "Wedding"].map(
          (item) => (
            <Checkbox
              key={item}
              label={item}
              checked={filters.occasion?.includes(item)}
              onChange={() => toggleCheckbox("occasion", item)}
            />
          ),
        )}
      </Section>

      {/* ================= LONGEVITY ================= */}
      <Section title="Longevity">
        {["4–6 Hours", "6–8 Hours", "8–12 Hours", "12+ Hours"].map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={filters.longevity?.includes(item)}
            onChange={() => toggleCheckbox("longevity", item)}
          />
        ))}
      </Section>

      {/* ================= CLEAR ================= */}
      <button
        onClick={clearFilters}
        className="w-full bg-[#2b1b1f] text-white text-sm py-2 rounded-full hover:opacity-90 transition"
      >
        Clear All Filters
      </button>
    </aside>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-medium mb-3 text-[#2b1b1f]">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#4a2d33] cursor-pointer">
      <input
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        className="accent-[#a36b74]"
      />
      {label}
    </label>
  );
}
