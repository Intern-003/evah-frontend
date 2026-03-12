const messages = [
  "Delivery Across India",
  "New Customer use code: 'WELCOME10'",
  "Scented Wedding Sale is Live — SHOP NOW",
];

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-10 bg-white text-rosewood z-[50] overflow-hidden">
      <div className="relative h-full flex items-center justify-center pointer-events-none">
        {messages.map((text, index) => (
          <div
            key={index}
            className="absolute w-full text-center text-[13px] tracking-wide font-medium animate-slideOffers"
            style={{ animationDelay: `${index * 3}s` }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
