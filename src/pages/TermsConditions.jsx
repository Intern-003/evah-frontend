import React from "react";

export default function TermsConditions() {
  return (
    <section className="bg-gradient-to-b from-[#FFF7F9] to-white py-32 mt-20">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            LEGAL
          </p>

          <h1 className="font-serif text-[40px] md:text-[46px] text-[#2b1b1f] mb-6">
            Terms & Conditions
          </h1>

          <div className="w-20 h-[2px] bg-[#e4a3b1] mx-auto rounded-full" />

          <p className="mt-6 text-sm text-[#6d4b53]">
            Last updated: January 2026
          </p>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="space-y-14 text-[#4a2d33] leading-[1.9] text-[15px]">
          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the EVAH website, you agree to comply with
              and be bound by these Terms & Conditions. If you do not agree with
              any part of these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              2. Products & Orders
            </h2>
            <p>
              All products are subject to availability. We reserve the right to
              limit quantities, discontinue items, or refuse orders at our sole
              discretion. Prices are subject to change without prior notice.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              3. Payments
            </h2>
            <p>
              Payments must be completed at the time of purchase. We accept
              secure payment methods through trusted third-party payment
              processors. EVAH does not store full payment details on its
              servers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              4. Shipping & Delivery
            </h2>
            <p>
              Delivery timelines are estimates and may vary depending on
              location and external factors. EVAH is not responsible for delays
              caused by shipping carriers or unforeseen circumstances.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              5. Returns & Refunds
            </h2>
            <p>
              Our Refund & Returns policy outlines the terms under which
              products may be returned. Please review that policy for detailed
              information before initiating a return.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              6. Intellectual Property
            </h2>
            <p>
              All content on this website — including logos, images, product
              descriptions, and branding — is the intellectual property of EVAH.
              Unauthorized use, reproduction, or distribution is strictly
              prohibited.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              EVAH shall not be liable for any indirect, incidental, or
              consequential damages arising from the use or inability to use our
              products or website.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              8. Governing Law
            </h2>
            <p>
              These Terms & Conditions are governed by applicable laws. Any
              disputes arising from the use of this website shall be resolved in
              accordance with local jurisdiction regulations.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              9. Contact Information
            </h2>
            <p>
              If you have questions regarding these Terms & Conditions, please
              contact us at{" "}
              <span className="font-medium text-[#2b1b1f]">
                hello@evahperfume.com
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
