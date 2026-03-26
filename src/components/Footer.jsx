import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#fff7fa] border-t border-[#f3d2d9] pt-18 pb-10 overflow-hidden">
      {/* SOFT GLOW */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#FF76B9]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#FF76B9]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-[1440px] mx-auto px-6 xl:px-16">
        <div className="grid md:grid-cols-4 gap-16">
          {/* BRAND */}
          <div>
            <h3 className="text-[28px] font-serif tracking-[0.35em] text-[#2b1b1f] mb-5">
              EVAH
            </h3>

            <p className="text-[#6d4b53] text-sm leading-relaxed max-w-[260px]">
              Crafted luxury fragrances that define timeless elegance and
              elevate your everyday presence.
            </p>

            {/* MINI SOCIAL */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  name: "facebook",
                  url: "https://www.facebook.com/profile.php?id=61573993740603",
                },
                { name: "instagram", url: "https://www.instagram.com/e_vah_/" },
                { name: "x", url: "https://x.com/The_Evah" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#f3d2d9] flex items-center justify-center text-[#8b6a72] hover:bg-[#FF76B9] hover:text-white transition cursor-pointer"
                >
                  <i className={`fa-brands fa-${s.name}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-6 text-[#2b1b1f]">
              CONTACT
            </h4>

            <ul className="space-y-4 text-sm text-[#6d4b53] leading-relaxed">
              {/* ADDRESS */}
              <li className="flex gap-3">
                <span className="text-[#FF76B9] mt-[2px]">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>
                  316 Laxmi Plaza, <br />
                  Laxmi Industrial Estate, <br />
                  Andheri West, <br />
                  Mumbai, Maharashtra - 400053.
                </span>
              </li>

              {/* EMAIL */}
              <li className="flex gap-3 items-center hover:text-[#FF76B9] transition cursor-pointer">
                <span className="text-[#FF76B9]">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <span>evah.fragrance@gmail.com</span>
              </li>

              {/* PHONE */}
              <li className="flex gap-3 items-center hover:text-[#FF76B9] transition cursor-pointer">
                <span className="text-[#FF76B9]">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>+91 84500 07614</span>
              </li>
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-6 text-[#2b1b1f]">
              QUICK LINKS
            </h4>

            <ul className="space-y-3 text-sm text-[#6d4b53]">
              {[
                { name: "About Us", path: "/about-us" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Refund Policy", path: "/refund-policy" },
                { name: "Terms & Conditions", path: "/terms-conditions" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="relative hover:text-[#FF76B9] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide mb-6 text-[#2b1b1f]">
              STAY UPDATED
            </h4>

            <p className="text-sm text-[#6d4b53] mb-6">
              Get exclusive drops, offers & early access.
            </p>

            {/* INPUT */}
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  px-5 py-3
                  rounded-full
                  border border-[#f3d2d9]
                  bg-white
                  text-sm
                  outline-none
                  focus:ring-1
                  focus:ring-[#FF76B9]/40
                "
              />

              <button
                className="
                  absolute
                  right-1
                  top-1
                  bottom-1
                  px-5
                  rounded-full
                  bg-gradient-to-r
                  from-[#FF76B9]
                  to-[#ffa3cf]
                  text-white
                  text-sm
                  font-medium
                  hover:opacity-90
                  transition
                  cursor-pointer
                "
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-6 border-t border-[#f3d2d9] flex flex-col md:flex-row justify-between items-center text-sm text-[#8b6a72]">
          <p>© {new Date().getFullYear()} EVAH. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-[#FF76B9] cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-[#FF76B9] cursor-pointer transition">
              Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
