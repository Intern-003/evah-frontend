import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import CartDrawer from "../components/CartDrawer";
import AddProduct from "../admin/components/AddProduct";
import Allproducts from "../admin/components/Allproducts";
import AddCategory from "../admin/components/AddCategory";
import AllCategory from "../admin/components/AllCategory";

const navItems = [
  { label: "AQUA PERFUME", path: "/aqua-perfume" },
  { label: "ATTARS", path: "/attars" },
  { label: "SHOP ALL", path: "/shop-all" },
  { label: "NEW ARRIVALS", path: "/new-arrivals" },
  { label: "HOME FRAGRANCE", path: "/home-fragrance" },
  { label: "GIFT & COLLECTION", path: "/gifts" },
  {
    label: "ABOUT",
    dropdown: [
      { label: "About Us", path: "/about-us" },
      { label: "Contact Us", path: "/contact-us" },
      { label: "Review", path: "/reviews" },
    ],
  },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isHomePage = location.pathname === "/";

  const { data, loading: wishlistLoading, refetch } = useGet("wishlist");
  const wishlistCount = data?.wishlist?.length || 0;

  const {
    data: cartData,
    loading: cartLoading,
    refetch: refetchCart,
  } = useGet("cart");

  const cartItems = cartData?.cart_items || [];

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.sale_price ?? item.product.price;
    return total + price * item.quantity;
  }, 0);

  useEffect(() => {
    const updateWishlist = () => {
      refetch();
    };

    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, [refetch]);

  useEffect(() => {
    const updateCart = () => {
      refetchCart();
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, [refetchCart]);

  /* ================= SCROLL LOGIC ================= */
  useEffect(() => {
    if (!isHomePage) {
      // Non-home pages → always solid
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  /* ================= ACTIVE STATE ================= */
  const active = isHomePage ? hovered || scrolled : true;

  const [cartOpen, setCartOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("product");

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed top-10 left-0 w-full h-31 z-50"
      >
        {/* WHITE SLIDE BACKGROUND */}
        <div
          className={`absolute inset-0 bg-white origin-top transition-transform duration-500 ease-out
          ${active ? "scale-y-100" : "scale-y-0"}
        `}
        />

        {/* CONTENT */}
        <div
          className={`relative max-w-[1440px] mx-auto h-full px-12 flex flex-col pt-4
          transition-colors duration-300
          ${active ? "text-black" : "text-white"}
        `}
        >
          {/* TOP ROW */}
          <div className="flex items-center justify-between">
            {/* SEARCH */}
            <button
              aria-label="Search"
              className="opacity-90 hover:opacity-100 transition cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* LOGO */}
            <h1
              onClick={() => {
                navigate("/"); // home page
                window.location.reload(); // refresh
              }}
              className="
              absolute left-1/2 -translate-x-1/2
              text-[40px]
              tracking-[0.30em]
              font-medium
              select-none
              cursor-pointer
              ml-2
            "
            >
              EVAH
            </h1>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-4">
              {/* ADMIN SETTINGS */}
              {role === "admin" && (
                <div className="relative group">
                  <button
                    aria-label="Admin Settings"
                    className="opacity-90 hover:opacity-100 transition cursor-pointer hover:rotate-12 duration-300"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c0 .7.4 1.3 1 1.5H21a2 2 0 1 1 0 4h-.2c-.7 0-1.3.4-1.4 1z" />
                    </svg>
                  </button>

                  {/* DROPDOWN */}
                  <div
                    className="absolute left-1 mt-4 w-44 bg-white text-black shadow-lg 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-300 z-50"
                  >
                    <div
                      onClick={() => navigate("/admin/dashboard")}
                      className="px-5 py-3 text-xs tracking-widest hover:bg-gray-100 cursor-pointer transition"
                    >
                      Dashboard
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddProductOpen(true);
                      }}
                      className="px-5 py-3 text-xs tracking-widest hover:bg-gray-100 cursor-pointer transition"
                    >
                      Products Management
                    </div>
                  </div>
                </div>
              )}

              {/* PROFILE */}
              <button
                aria-label="Account"
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (token) {
                    navigate("/profile"); // Already logged in
                  } else {
                    navigate("/login"); // Not logged in
                  }
                }}
                className="relative opacity-90 hover:opacity-100 transition cursor-pointer"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c2-4 14-4 16 0" />
                </svg>
              </button>

              {/* WISHLIST */}
              <button
                // aria-label="Wishlist"
                onClick={() => {
                  navigate("/wishlist"); // Already logged in
                }}
                className="relative opacity-90 hover:opacity-100 transition cursor-pointer"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.8 4.6c-1.5-1.6-4-1.6-5.5 0L12 7.9 8.7 4.6c-1.5-1.6-4-1.6-5.5 0-1.6 1.7-1.6 4.3 0 6l8.8 9 8.8-9c1.6-1.7 1.6-4.3 0-6z" />
                </svg>
                {!wishlistLoading && wishlistCount > 0 && (
                  <span
                    className="
                    absolute -top-2 -right-2
                    bg-[#FF76B9]
                    text-white
                    text-[10px]
                    w-5 h-5
                    rounded-full
                    flex items-center justify-center
                    shadow-md
                  "
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* CART */}
              <button
                onClick={() => {
                  if (location.pathname !== "/cart") {
                    setCartOpen(true);
                  }
                }}
                aria-label="Cart"
                className="flex items-center gap-2 rounded-md relative opacity-90 hover:opacity-100 transition cursor-pointer"
              >
                {/* CART ICON */}

                <div className="relative">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6 6h15l-1.5 9h-13z" />
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="18" cy="21" r="1" />
                  </svg>

                  {/* ITEM COUNT BADGE */}

                  {!cartLoading && cartCount > 0 && (
                    <span
                      className="
                    absolute
                    -top-2
                    -right-2
                    bg-[#FF76B9]
                    text-white
                    text-[10px]
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    rounded-full
                    "
                    >
                      {cartCount}
                    </span>
                  )}
                </div>

                {/* PRICE */}

                <span className="text-sm font-medium">
                  {cartLoading ? "" : `₹${subtotal}`}
                </span>
              </button>
              <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="mt-7">
            <ul className="flex justify-center gap-12 text-[12px] tracking-[0.28em] font-light">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="group relative cursor-pointer opacity-90 hover:opacity-100 transition
                after:absolute after:left-0 after:-bottom-2 after:h-[1px]
                after:w-0 after:bg-current after:transition-all after:duration-300
                hover:after:w-full"
                >
                  {/* NORMAL ITEM */}
                  {!item.dropdown && (
                    <span onClick={() => navigate(item.path)}>
                      {item.label}
                    </span>
                  )}

                  {/* DROPDOWN ITEM */}
                  {item.dropdown && (
                    <>
                      <span>{item.label}</span>

                      <ul
                        className="absolute top-full left-1/2 -translate-x-1/4 mt-4
                      w-48 bg-white text-black shadow-lg opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-300"
                      >
                        {item.dropdown.map((sub) => (
                          <li
                            key={sub.label}
                            onClick={() => navigate(sub.path)}
                            className="px-5 py-3 text-xs tracking-widest hover:bg-gray-100 transition"
                          >
                            {sub.label}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {addProductOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[100]"
          onClick={() => setAddProductOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
            w-[900px]
            max-h-[90vh]
            overflow-hidden
            bg-gradient-to-b from-[#fff7f9] to-white
            rounded-[28px]
            border border-[#f3d2d9]
            shadow-[0_40px_120px_rgba(255,118,185,0.35)]
            flex
          "
          >
            {/* LEFT SIDEBAR */}
            <div className="w-[220px] border-r border-[#f3d2d9] p-6">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#c48b5a] mb-6">
                Management
              </p>

              <button
                onClick={() => setActiveTab("product")}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm mb-3 transition
              ${
                activeTab === "product"
                  ? "bg-[#FF76B9] text-white shadow-md"
                  : "hover:bg-[#fff1f4] text-[#2b1b1f]"
              }`}
              >
                Product Management
              </button>

              <button
                onClick={() => setActiveTab("Allproducts")}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm mb-3 transition
              ${
                activeTab === "Allproducts"
                  ? "bg-[#FF76B9] text-white shadow-md"
                  : "hover:bg-[#fff1f4] text-[#2b1b1f]"
              }`}
              >
                All Products
              </button>

              <button
                onClick={() => setActiveTab("category")}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition
              ${
                activeTab === "category"
                  ? "bg-[#FF76B9] text-white shadow-md"
                  : "hover:bg-[#fff1f4] text-[#2b1b1f]"
              }`}
              >
                Category Management
              </button>

              <button
                onClick={() => setActiveTab("AllCategory")}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition
              ${
                activeTab === "AllCategory"
                  ? "bg-[#FF76B9] text-white shadow-md"
                  : "hover:bg-[#fff1f4] text-[#2b1b1f]"
              }`}
              >
                All Category
              </button>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-10 overflow-y-auto relative">
              {/* CLOSE */}
              <button
                onClick={() => setAddProductOpen(false)}
                className="absolute top-6 right-6 text-[#6d4b53] hover:text-[#FF76B9] cursor-pointer"
              >
                ✕
              </button>

              {activeTab === "product" && (
                <>
                  <h2 className="text-2xl font-serif mb-8 text-[#2b1b1f]">
                    Add Product
                  </h2>

                  <AddProduct />
                </>
              )}

              {activeTab === "Allproducts" && (
                <>
                  <h2 className="text-2xl font-serif mb-8 text-[#2b1b1f]">
                    All products
                  </h2>

                  <Allproducts />
                </>
              )}

              {activeTab === "category" && (
                <>
                  <h2 className="text-2xl font-serif mb-8 text-[#2b1b1f]">
                    Add Category
                  </h2>

                  <AddCategory />
                </>
              )}

              {activeTab === "AllCategory" && (
                <>
                  <h2 className="text-2xl font-serif mb-8 text-[#2b1b1f]">
                    All Category
                  </h2>

                  <AllCategory />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
