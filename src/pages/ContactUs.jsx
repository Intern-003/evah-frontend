import React from "react";

export default function ContactUs() {
  return (
    <section className="bg-gradient-to-b from-[#FFF7F9] to-white py-32">
      <div className="max-w-[1050px] mx-auto px-6 text-center mt-24">
        {/* ===== HEADING ===== */}
        <h1 className="text-[44px] md:text-[50px] font-serif font-semibold tracking-wide text-[#2b1b1f]">
          CONTACT US
        </h1>

        {/* divider */}
        <div className="w-24 h-[2px] bg-gradient-to-r from-[#e4a3b1] to-[#c48b5a] mx-auto my-7 rounded-full" />

        {/* description */}
        <p className="max-w-[720px] mx-auto text-[15px] leading-relaxed text-[#6d4b53]">
          We genuinely look forward to hearing from you. For customer inquiries,
          the quickest way to reach us is through the Shop Chat bubble in the
          bottom-left corner of your screen — our team responds promptly and
          personally. You may also email us at{" "}
          <span className="font-medium text-[#2b1b1f]">
            evah.fragrance@gmail.com
          </span>
          , and we’ll be happy to assist you.
        </p>

        {/* ===== CARDS ===== */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <Card
            icon={<FeedbackIcon />}
            title="Share Your Experience With Us"
            desc="Your voice helps shape our craft. Tell us what you loved or how we can make your next scent journey even more memorable."
          />

          <Card
            icon={<PartnershipIcon />}
            title="Interested in Carrying EVAH Perfume?"
            desc="We welcome thoughtful partnerships. Let’s explore how our handcrafted fragrances can elevate your retail offering."
          />

          <Card
            icon={<TeamIcon />}
            title="Join Our Artisanal Team"
            desc="If you’re passionate about fragrance, creativity, and craftsmanship, we’d love to hear from you."
          />
        </div>

        {/* ===== CONTACT INFO STRIP ===== */}
        <div className="mt-24 space-y-16">
          {/* TOP INFO CARD */}
          <div
            className="
            bg-gradient-to-br from-[#FFF1F4] to-[#FFF7F9]
            border border-[#f3cdd5]
            rounded-2xl
            px-12 py-10
            max-w-[1100px]
            mx-auto
            text-left
            shadow-[0_14px_35px_rgba(228,163,177,0.18)]
            "
          >
            <h3 className="font-serif text-[20px] text-[#2b1b1f] mb-5">
              CA Perfume – Artisanal Perfumery House
            </h3>

            <ul className="space-y-4 text-sm text-[#6d4b53]">
              <li className="flex items-start gap-3">
                <LocationIcon />
                <span>
                  316 Laxmi Plaza, Laxmi Industrial Estate, Andheri West,
                  Mumbai, Maharashtra - 400053.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <PhoneIcon />
                <span>+91 84500 07614</span>
              </li>

              <li className="flex items-start gap-3">
                <MailIcon />
                <span className="font-medium text-[#2b1b1f]">
                  evah.fragrance@gmail.com
                </span>
              </li>
            </ul>

            <div className="mt-7">
              <h4 className="font-medium text-[#2b1b1f] mb-1">Shop Chat:</h4>
              <p className="text-sm text-[#6d4b53]">
                The fastest way to reach our team for customer support.
              </p>
            </div>
          </div>

          {/* BOTTOM HELP CARD */}
          <div
            className="
            bg-white
            border border-[#f3cdd5]
            rounded-2xl
            px-12 py-7
            max-w-[760px]
            mx-auto
            text-center
            shadow-[0_12px_30px_rgba(228,163,177,0.22)]
            "
          >
            <h3 className="font-serif text-[18px] text-[#2b1b1f] mb-2">
              Need help right now?
            </h3>

            <p className="text-sm text-[#6d4b53] leading-relaxed">
              The Shop Chat bubble in the bottom-left corner connects you
              directly with our support team — fast, friendly, and personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== PREMIUM CARD ===== */

function Card({ icon, title, desc }) {
  return (
    <div
      className="
        w-[300px] md:w-[280px]
        relative bg-white rounded-3xl p-10
        border border-[#f3d9df]
        shadow-[0_8px_25px_rgba(228,163,177,0.18)]
        transition-all duration-500 ease-out
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(228,163,177,0.35)]
        hover:border-[#e4a3b1]
        group
      "
    >
      {/* subtle inner glow */}
      <div
        className="
          absolute inset-0 rounded-3xl
          bg-gradient-to-br from-[#fff1f4] to-transparent
          opacity-0 group-hover:opacity-100
          transition duration-500
          pointer-events-none
        "
      />

      {/* icon */}
      <div className="relative z-10 text-[#c48b5a] mb-6 flex justify-center">
        {icon}
      </div>

      {/* title */}
      <h3 className="relative z-10 font-serif text-[18px] text-[#2b1b1f] mb-4">
        {title}
      </h3>

      {/* text */}
      <p className="relative z-10 text-sm leading-relaxed text-[#6d4b53]">
        {desc}
      </p>
    </div>
  );
}

/* ===== PREMIUM SVG ICONS ===== */

function FeedbackIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c48b5a"
      strokeWidth="1.6"
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="15" y2="12" />
    </svg>
  );
}

function PartnershipIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c48b5a"
      strokeWidth="1.6"
    >
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="12" r="3" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c48b5a"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c1.5-3 12.5-3 14 0" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c48b5a"
      strokeWidth="1.6"
    >
      <path d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c48b5a"
      strokeWidth="1.6"
    >
      <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 012 5.2 2 2 0 014 3h3a2 2 0 012 1.7l.6 3a2 2 0 01-.5 1.8l-1.2 1.2a16 16 0 007 7l1.2-1.2a2 2 0 011.8-.5l3 .6a2 2 0 011.7 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c48b5a"
      strokeWidth="1.6"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
