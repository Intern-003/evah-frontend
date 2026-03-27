import { useState, useEffect, useRef } from "react";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatMode, setChatMode] = useState(false);

  const chatbotRef = useRef(null);

  const { data } = useGet("chat/questions");
  const { execute } = usePost("chat/send");
  const { data: chatData } = useGet("chat/messages");

  const questions = data?.questions || [];

  const { data: answerData, loading: answerLoading } = useGet(
    selectedQuestion ? `chat/answer/${selectedQuestion}` : null,
  );

  const answer = answerData?.answer;

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const message = userMessage;

    setChatHistory((prev) => [
      ...prev,
      { type: "user", text: message },
      {
        type: "bot",
        text: "Thanks for contacting us! Our support team will reach out to you as soon as possible.",
      },
    ]);

    setUserMessage("");
    setChatMode(true);
    setSelectedQuestion(null);

    try {
      await execute({ message });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!chatData?.messages) return;

    const formatted = [];

    chatData.messages.forEach((msg) => {
      formatted.push({ type: "user", text: msg.message });

      if (msg.reply) {
        formatted.push({ type: "bot", text: msg.reply });
      }
    });

    setChatHistory(formatted);
    setChatMode(true);
  }, [chatData]);

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

        {/* <div className="p-4 max-h-[420px] overflow-y-auto space-y-3">
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
        </div> */}
        <div className="p-4 max-h-[420px] overflow-y-auto space-y-3">
          {/* 🔥 CHAT MODE */}
          {chatMode && (
            <>
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
              px-4 py-2 rounded-xl text-sm max-w-[75%]
              ${
                msg.type === "user"
                  ? "bg-[#FF76B9] text-white"
                  : "bg-[#fff1f4] text-[#2b1b1f]"
              }
            `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* 🔥 QUESTIONS MODE */}
          {!chatMode && !selectedQuestion && (
            <>
              <p className="text-xs text-[#6d4b53] mb-3">Popular questions</p>

              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q.id)}
                  className="w-full text-left bg-[#fff1f4] hover:bg-[#ffe3ea] text-sm px-4 py-3 rounded-xl"
                >
                  {q.question}
                </button>
              ))}
            </>
          )}

          {/* 🔥 ANSWER */}
          {!chatMode && selectedQuestion && (
            <div className="space-y-3">
              <div className="bg-[#fff1f4] text-sm p-4 rounded-xl">
                {answerLoading ? <TypingDots /> : answer}
              </div>

              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-xs text-[#FF76B9] hover:underline"
              >
                ← Back
              </button>
            </div>
          )}
        </div>

        <div className="border-t bg-white px-4 py-3">
          <div className="flex items-center gap-2 bg-[#FFF1F4] border border-[#ffd6e0] rounded-full px-3 py-2 shadow-sm">
            {/* INPUT */}
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="
        flex-1
        bg-transparent
        text-sm
        px-2
        outline-none
        placeholder:text-[#b88a95]
      "
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            {/* SEND BUTTON */}
            <button
              onClick={handleSend}
              className="
                w-9 h-9
                flex items-center justify-center
                rounded-full
                bg-gradient-to-br from-[#FF76B9] to-[#FF9FCC]
                text-white
                shadow-md
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              {/* ICON */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
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
