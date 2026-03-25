import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Reviews", path: "/admin/reviews" },
  { name: "Chatbot", path: "/admin/chatbot" },
  { name: "Coupons", path: "/admin/coupons" },
  { name: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-[250px] bg-white border-r border-[#f3d2d9]">
      <div className="p-8 font-serif text-xl text-[#FF76B9]">EVAH ADMIN</div>

      <nav className="space-y-1 px-4">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm transition
              ${
                isActive
                  ? "bg-[#fff1f4] text-[#FF76B9]"
                  : "text-[#6d4b53] hover:bg-[#fff7f9]"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
