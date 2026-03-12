import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#f1d6dd] pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-10 xl:px-16">
        <div className="grid md:grid-cols-4 gap-14">
          {/* LOGO + BRAND */}
          <div>
            <h3 className="text-[26px] font-serif tracking-[0.3em] text-[#2b1b1f] mb-4">
              EVAH
            </h3>
            <p className="text-[#6d4b53] text-sm leading-relaxed">
              Luxury fragrances crafted with passion. Timeless elegance in every
              bottle.
            </p>
          </div>

          {/* WRITE TO US */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-6 text-[#2b1b1f]">
              WRITE TO US
            </h4>

            <ul className="space-y-4 text-sm text-[#6d4b53]">
              <li>
                Address: 1237 E Warner Avenue,
                <br />
                Santa Ana CA 92705
              </li>
              <li>hello@evahperfume.com</li>
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-6 text-[#2b1b1f]">
              USEFUL LINKS
            </h4>

            {/* <ul className="space-y-3 text-sm text-[#6d4b53]">
              <li className="hover:text-[#FF76B9] cursor-pointer transition">
                Blogs
              </li>
              <li className="hover:text-[#FF76B9] cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-[#FF76B9] cursor-pointer transition">
                Refund & Returns
              </li>
              <li className="hover:text-[#FF76B9] cursor-pointer transition">
                Terms & Conditions
              </li>
            </ul> */}
            <ul className="space-y-3 text-sm text-[#6d4b53]">
              <li>
                <Link to="/blogs" className="hover:text-[#FF76B9] transition">
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#FF76B9] transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-[#FF76B9] transition"
                >
                  Refund & Returns
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-conditions"
                  className="hover:text-[#FF76B9] transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-6 text-[#2b1b1f]">
              NEWSLETTER SIGNUP
            </h4>

            <p className="text-sm text-[#6d4b53] mb-6">
              Subscribe to our newsletter for new drops and exclusive deals.
            </p>

            <div
              className="
                    flex items-center
                    border border-[#FF76B9]
                    rounded-full
                    overflow-hidden
                    bg-white
                    focus-within:ring-1
                    focus-within:ring-[#FF76B9]/40
                    transition
                "
            >
              <input
                type="email"
                placeholder="Your email address"
                className="
                    flex-1
                    px-6 py-3.5
                    text-sm
                    text-[#2b1b1f]
                    placeholder-[#6d4b53]
                    outline-none
                    bg-transparent
                    "
              />

              <button
                className="
                    px-7 py-3.5
                    bg-[#FF76B9]
                    text-white
                    text-sm
                    font-medium
                    tracking-wide
                    transition-all duration-300
                    hover:bg-[#ff5fa2]
                    "
              >
                Subscribe
              </button>
            </div>
            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-6">
              {[
                {
                  label: "Facebook",
                  icon: "M9 8h2V6c0-1.1.9-2 2-2h2v3h-2v1h2v3h-2v8h-3V11H9V8z",
                },
                {
                  label: "LinkedIn",
                  icon: "M4 3a2 2 0 110 4 2 2 0 010-4zm0 6h4v12H4V9zm6 0h4v2h.1c.6-1.1 2-2.1 4.1-2.1 4.4 0 5.2 2.9 5.2 6.6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z",
                },
                {
                  label: "Instagram",
                  icon: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a4 4 0 100 8 4 4 0 000-8zm6.5-.5a1 1 0 11-2 0 1 1 0 012 0z",
                },
                {
                  label: "X",
                  icon: "M18 3l-5.5 6.5L18 21h-4.5l-3.5-4.5L6 21H3l6-7L3 3h4.5l3 4L13.5 3H18z",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  aria-label={item.label}
                  className="
                    w-8 h-8
                    rounded-full
                    bg-[#FFB3C6]
                    flex items-center justify-center
                    text-[#2b1b1f]
                    transition-all duration-300
                    hover:bg-[#FF76B9]
                    hover:text-white
                    hover:-translate-y-[2px]
                "
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={item.icon} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-6 border-t border-[#f1d6dd] flex flex-col md:flex-row items-center justify-between text-sm text-[#6d4b53]">
          <p>© {new Date().getFullYear()} EVAH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
