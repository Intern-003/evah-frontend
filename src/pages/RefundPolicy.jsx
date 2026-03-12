import React from "react";

export default function RefundPolicy() {
  return (
    <section className="bg-gradient-to-b from-[#FFF7F9] to-white py-32 mt-20">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            LEGAL
          </p>

          <h1 className="font-serif text-[40px] md:text-[46px] text-[#2b1b1f] mb-6">
            Refund & Returns Policy
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
              1. Return Eligibility
            </h2>
            <p>
              We accept returns within 7 days of delivery. Items must be unused,
              unopened, and in their original packaging. Proof of purchase is
              required for all returns.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              2. Non-Returnable Items
            </h2>
            <p>
              For hygiene and safety reasons, opened perfumes, attars, or
              personal care products cannot be returned unless damaged or
              defective upon arrival.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              3. Damaged or Incorrect Orders
            </h2>
            <p>
              If your order arrives damaged or incorrect, please contact us
              within 48 hours of delivery with clear photos of the product and
              packaging. We will arrange a replacement or refund accordingly.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              4. Refund Process
            </h2>
            <p>
              Once your return is received and inspected, we will notify you of
              the approval or rejection of your refund. Approved refunds will be
              processed within 5–7 business days to your original payment
              method.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              5. Shipping Costs
            </h2>
            <p>
              Shipping fees are non-refundable. Customers are responsible for
              return shipping costs unless the product was damaged or incorrect.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-[22px] text-[#2b1b1f] mb-4">
              6. Contact Us
            </h2>
            <p>
              For return requests or assistance, please contact our support team
              at{" "}
              <span className="font-medium text-[#2b1b1f]">
                hello@evahperfume.com
              </span>{" "}
              with your order number and details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
