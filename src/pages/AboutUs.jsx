import React from "react";
import { useNavigate } from "react-router-dom";

import aboutoneImg from "../../src/assets/images/aboutone.png";
import library1Img from "../../src/assets/images/library1.png";
import library2Img from "../../src/assets/images/library2.png";
import library3Img from "../../src/assets/images/library3.png";

export default function AboutUs() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      {/* <section className="relative h-[95vh] w-full overflow-hidden"> */}
      <section className="relative h-[70vh] md:h-[95vh] w-full overflow-hidden">
        {/* Background Image */}
        <img
          src={aboutoneImg}
          alt="About Evah Perfume"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark + Pink overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#2b1b1f]/70" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-[900px] text-white">
            <h1 className="font-serif text-[24px] md:text-[38px] leading-tight tracking-wide mt-10 md:mt-30 mb-6">
              A Quarter Century of Crafting the Invisible Art
            </h1>

            <p className="text-[13px] md:text-[15px] leading-relaxed text-white/90 max-w-[720px] mx-auto">
              For 25 years, we’ve lived inside the world of scent — researching
              oils, perfecting formulas, and building a California-born
              perfumery rooted in emotion and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LIBRARY SECTION ================= */}
      <section className="bg-gradient-to-b from-[#FFF7F9] to-[#FFFDFC] py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            THE LIBRARY
          </p>

          {/* Heading */}
          <h2 className="font-serif text-[36px] md:text-[30px] text-[#2b1b1f] mb-6">
            1,000+ Scents. Endless Ways to Feel Like You.
          </h2>

          {/* Description */}
          <p className="max-w-[760px] mx-auto text-[15px] md:text-[15px] leading-[1.9] text-[#6d4b53] mb-20">
            From niche creations to rediscovered classics and Originals crafted
            in California, our perfume library is designed so you can explore
            widely, layer boldly, and build a scent wardrobe that’s entirely
            your own.
          </p>

          {/* Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
            <LibraryCard
              image={library1Img}
              label="NICHE & ARTISANAL"
              title="For the Curious Nose"
              desc="Discover complex, story-driven compositions crafted for perfume lovers who seek depth, texture, and character in every spritz."
            />

            <LibraryCard
              image={library2Img}
              label="DISCONTINUED GEMS"
              title="Scents Worth Keeping Alive"
              desc="We preserve the fragrances that shouldn’t have vanished—so you can revisit the scents that defined your favorite chapters."
            />

            <LibraryCard
              image={library3Img}
              label="ORIGINALS & SINGLE NOTES"
              title="Crafted in California"
              desc="Explore EVAH Originals and minimalist single-note fragrances designed for layering, mood, and everyday ritual."
            />
          </div>
        </div>
      </section>

      {/* ================= JOURNEY / TIMELINE SECTION ================= */}
      <section className="bg-[#FFF8FA] py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Top Heading */}
          <div className="text-center mb-24">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
              25 YEARS IN THE MAKING
            </p>

            <h2 className="font-serif text-[36px] md:text-[30px] text-[#2b1b1f] mb-6">
              From Quiet Obsession to a Perfume Library.
            </h2>

            <p className="max-w-[760px] mx-auto text-[15px] leading-[1.9] text-[#6d4b53]">
              CA Perfume didn’t appear overnight. It grew over decades—through
              study, experimentation, and thousands of conversations with people
              who love perfume as much as we do.
            </p>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-[1px] bg-[#e9c4cf] md:-translate-x-1/2" />

            {/* ===== ITEM 1 (LEFT) ===== */}
            <TimelineItem
              side="left"
              year="EARLY 2000s"
              title="Where It All Began."
            >
              Our story started in small perfume shops and labs—learning
              everything we could about oils, accords, and the classics that
              shaped modern perfumery. It was less about “launching a brand” and
              more about building a lifelong craft.
            </TimelineItem>

            {/* ===== ITEM 2 (RIGHT) ===== */}
            <TimelineItem
              side="right"
              year="2010–2015"
              title="The Library Takes Shape."
            >
              We began building an extensive archive—studying niche gems,
              loved-and-lost discontinued scents, and global bestsellers. Behind
              the scenes, our own catalog of impressions and experimental blends
              quietly grew into a true perfume library.
            </TimelineItem>

            {/* ===== ITEM 3 (LEFT) ===== */}
            <TimelineItem
              side="left"
              year="2016–2020"
              title="Sharing Our World Online."
            >
              CA Perfume stepped fully into the digital world. Our fragrances
              became accessible to scent lovers across the U.S., and our focus
              turned to education, transparency, and helping people explore
              beyond the typical fragrance counter.
            </TimelineItem>

            {/* ===== ITEM 4 (RIGHT) ===== */}
            <TimelineItem
              side="right"
              year="2021–2025"
              title="Originals, Minimalism & Emotion."
            >
              We launched CA Perfume Originals, minimalist single-note
              collections, and an even deeper focus on emotional
              perfumery—treating scent as a transmission of feeling. Our library
              passed 1,000+ profiles, and our small-batch studio in California
              became the heart of everything we do.
            </TimelineItem>

            {/* ===== ITEM 5 (LEFT) ===== */}
            <TimelineItem
              side="left"
              year="TODAY & BEYOND"
              title="A Living, Breathing Perfume House."
            >
              Today, CA Perfume is an independent perfume house with a living
              archive—constantly evolving as we learn, create, and listen. The
              goal is simple: to make it easier for you to find the scents that
              feel like home, and the ones that help you write your next
              chapter.
            </TimelineItem>
          </div>
        </div>
      </section>

      {/* ================= SHOP BY MOOD SECTION ================= */}
      <section className="bg-[#FFF8FA] pt-5 pb-25">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b88994] mb-4">
            SHOP BY MOOD
          </p>

          {/* Heading */}
          <h2 className="font-serif text-[36px] md:text-[30px] text-[#2b1b1f] mb-6">
            Find a Scent That Matches Your Moment.
          </h2>

          {/* Description */}
          <p className="max-w-[760px] mx-auto text-[15px] leading-[1.9] text-[#6d4b53] mb-20">
            Whether you’re in the mood for something soft, bold, cozy, or
            edible, start your journey with fragrances that feel like your
            current chapter.
          </p>

          {/* Mood Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            <MoodCard
              label="EVERYDAY"
              title="Fresh & Clean"
              desc="Airy, uplifting scents that feel like a crisp white shirt and an open window. Perfect for everyday, office, and “out the door” moments."
              action="SHOP FRESH"
            />

            <MoodCard
              label="WARM & COZY"
              title="Comfort & Cashmere"
              desc="Warm ambers, musks, and soft woods—your go-to for slow mornings, knit sweaters, and evenings in."
              action="SHOP WARM"
            />

            <MoodCard
              label="FLORAL"
              title="Soft & Romantic"
              desc="Petal-soft florals and luminous bouquets for dates, celebrations, and “I want to feel special” days."
              action="SHOP FLORALS"
            />

            <MoodCard
              label="EDIBLE"
              title="Gourmand & Craveable"
              desc="Vanilla swirls, creamy notes, and dessert-inspired accords that feel playful, delicious, and unforgettable."
              action="SHOP GOURMAND"
            />

            <MoodCard
              label="BOLD"
              title="Statement & Night Out"
              desc="Intense, confident scents with presence—perfect for nights out, events, and moments when you want to be remembered."
              action="SHOP BOLD"
            />

            <MoodCard
              label="SHAREABLE"
              title="Unisex & Fluid"
              desc="Effortlessly wearable scents that move beyond labels—made to be shared, layered, and owned by you."
              action="SHOP UNISEX"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= CARD ================= */

function LibraryCard({ image, label, title, desc }) {
  return (
    <div
      className="
        w-full max-w-[320px]
        bg-[#fff3f6]
        rounded-3xl
        overflow-hidden
        border border-[#f1cfd6]
        shadow-[0_14px_35px_rgba(228,163,177,0.22)]
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_22px_50px_rgba(228,163,177,0.35)]
      "
    >
      {/* Image */}
      <div className="h-[180px] sm:h-[220px] md:h-[300px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition duration-700 hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="p-8 text-left">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#b88994] mb-3">
          {label}
        </p>

        <h3 className="font-serif text-[20px] text-[#2b1b1f] mb-3">{title}</h3>

        <p className="text-sm leading-[1.8] text-[#6d4b53]">{desc}</p>
      </div>
    </div>
  );
}

function TimelineItem({ side, year, title, children }) {
  const isLeft = side === "left";

  return (
    <div className="relative mb-16">
      {/* LINE DOT */}
      <div className="absolute left-0 md:left-1/2 top-3 md:top-6 md:-translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#e4a3b1]" />

      {/* CARD */}
      <div
        className={`
          ml-6 md:ml-0
          md:w-[48%]
          w-full
          bg-white
          rounded-2xl
          p-6 md:p-8
          border border-[#f1cfd6]
          shadow-[0_12px_30px_rgba(228,163,177,0.2)]
          ${
            isLeft
              ? "md:mr-auto md:pr-10 text-left"
              : "md:ml-auto md:pl-10 text-left"
          }
        `}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#b88994] mb-2">
          {year}
        </p>

        <h3 className="font-serif text-[18px] md:text-[22px] text-[#2b1b1f] mb-3">
          {title}
        </h3>

        <p className="text-sm leading-[1.8] text-[#6d4b53]">{children}</p>
      </div>
    </div>
  );
}

function MoodCard({ label, title, desc, action }) {
  const navigate = useNavigate();
  return (
    <div
      className="
        w-full max-w-[360px]
        bg-[#fff5f7]
        rounded-2xl
        p-8
        text-left
        border border-[#f1cfd6]
        shadow-[0_10px_25px_rgba(228,163,177,0.18)]
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(228,163,177,0.3)]
      "
    >
      <p className="text-[10px] tracking-[0.25em] uppercase text-[#b88994] mb-3">
        {label}
      </p>

      <h3 className="font-serif text-[20px] text-[#2b1b1f] mb-3">{title}</h3>

      <p className="text-sm leading-[1.8] text-[#6d4b53] mb-6">{desc}</p>

      <button
        onClick={() => navigate("/shop-all")}
        className="cursor-pointer inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#2b1b1f] border border-[#e4a3b1] px-4 py-2 rounded-full hover:bg-[#fbe3e8] transition"
      >
        {action}
        <span className="text-[#b88994]">→</span>
      </button>
    </div>
  );
}
