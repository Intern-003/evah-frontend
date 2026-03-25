import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="bg-gradient-to-b from-[#FFF7F9] to-white py-32 mt-20">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            LEGAL
          </p>

          <h1 className="font-serif text-[40px] md:text-[46px] text-[#2b1b1f] mb-6">
            Privacy Policy
          </h1>

          <div className="w-20 h-[2px] bg-[#e4a3b1] mx-auto rounded-full" />

          <p className="mt-6 text-sm text-[#6d4b53]">
            Last updated: January 2026
          </p>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="space-y-14 text-[#4a2d33] leading-[1.9] text-[15px]">
          {/* Section */}
          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you create an account, place an order, subscribe to our
              newsletter, or contact us. This may include your name, email
              address, shipping address, billing information, and payment
              details.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process transactions, deliver orders,
              improve our services, and communicate important updates regarding
              your purchase or account. We may also use your email to send
              promotional offers if you have opted in.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal information. Your data may be
              shared with trusted third-party service providers for payment
              processing, shipping, or marketing support — strictly to fulfill
              our services.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              5. Cookies
            </h2>
            <p>
              Our website uses cookies to enhance user experience, analyze site
              traffic, and improve performance. You can choose to disable
              cookies in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              6. Your Rights
            </h2>
            <p>
              You may request access, correction, or deletion of your personal
              data at any time. To exercise your rights, please contact us at
              Evah.fragrance@gmail.com.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              7. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be
              reflected on this page with an updated revision date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
