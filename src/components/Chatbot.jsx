import { useState, useEffect, useRef } from "react";
import { useGet } from "../hooks/useGet";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const chatbotRef = useRef(null);

  const { data } = useGet("chat/questions");

  const questions = data?.questions || [];

  const { data: answerData, loading: answerLoading } = useGet(
    selectedQuestion ? `chat/answer/${selectedQuestion}` : null,
  );

  const answer = answerData?.answer;

  /* ================= CLOSE ON OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* ================= CLOSE ON SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* FLOATING BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="
        fixed bottom-8 right-8
        w-14 h-14
        rounded-full
        bg-gradient-to-br from-[#FF76B9] to-[#FF9FCC]
        text-white
        flex items-center justify-center
        shadow-[0_15px_40px_rgba(255,118,185,0.55)]
        hover:scale-105
        transition-all
        duration-300
        z-[200]
        cursor-pointer
        animate-pulse
        "
      >
        {/* CHAT ICON */}

        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      </button>

      {/* CHAT WINDOW */}

      <div
        ref={chatbotRef}
        className={`
        fixed bottom-24 right-8
        w-[340px]
        bg-white
        rounded-2xl
        border border-[#f3d2d9]
        shadow-[0_30px_80px_rgba(0,0,0,0.25)]
        overflow-hidden
        transition-all duration-500
        z-[200]
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
        `}
      >
        {/* HEADER */}

        <div
          className="
          bg-gradient-to-r from-[#FF76B9] to-[#FF9FCC]
          text-white
          px-5 py-4
          flex justify-between items-center
          "
        >
          <div>
            <p className="text-sm font-semibold">Perfume Assistant</p>

            <p className="text-xs opacity-80">Ask anything about fragrances</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* BODY */}

        <div className="p-4 max-h-[420px] overflow-y-auto space-y-3">
          {!selectedQuestion && (
            <>
              <p className="text-xs text-[#6d4b53] mb-3">Popular questions</p>

              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q.id)}
                  className="
                  w-full text-left
                  bg-[#fff1f4]
                  hover:bg-[#ffe3ea]
                  text-sm
                  px-4 py-3
                  rounded-xl
                  transition
                  cursor-pointer
                  "
                >
                  {q.question}
                </button>
              ))}
            </>
          )}

          {/* ANSWER */}

          {selectedQuestion && (
            <div className="space-y-3">
              <div
                className="
                bg-[#fff1f4]
                text-sm
                p-4
                rounded-xl
                leading-relaxed
                "
              >
                {answerLoading ? <TypingDots /> : answer}
              </div>

              <button
                onClick={() => setSelectedQuestion(null)}
                className="
                text-xs
                text-[#FF76B9]
                hover:underline
                "
              >
                ← Back to questions
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ================= TYPING ANIMATION ================= */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 text-sm text-[#6d4b53]">
      <span>Typing</span>
      <span className="w-1 h-1 bg-[#FF76B9] rounded-full animate-bounce" />

      <span className="w-1 h-1 bg-[#FF76B9] rounded-full animate-bounce delay-150" />

      <span className="w-1 h-1 bg-[#FF76B9] rounded-full animate-bounce delay-300" />
    </div>
  );
}
