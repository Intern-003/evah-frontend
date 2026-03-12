import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import CartDrawer from "../components/CartDrawer";

const navItems = [
  { label: "AQUA PERFUME", path: "/aqua-perfume" },
  { label: "ATTARS", path: "/attars" },
  { label: "SHOP ALL", path: "/shop-all" },
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
  { label: "NEW ARRIVALS", path: "/new-arrivals" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
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
              // onClick={() => setCartOpen(true)}
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
                  <span onClick={() => navigate(item.path)}>{item.label}</span>
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
  );
}
