import { useState } from "react";
import toast from "react-hot-toast";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";

export default function Queries() {
  const { data, loading, refetch } = useGet("admin/chat/messages");

  // ✅ no endpoint here (dynamic use karenge)
  const { execute } = usePost();

  const [replyText, setReplyText] = useState({});
  const [sendingId, setSendingId] = useState(null);

  const messages = data?.messages || [];

  const handleReply = async (id) => {
    if (!replyText[id]) {
      return toast.error("Reply cannot be empty");
    }

    try {
      setSendingId(id);

      // ✅ CORRECT (body first, endpoint second)
      await execute({ reply: replyText[id] }, `admin/chat/reply/${id}`);

      toast.success("Reply sent");

      setReplyText((prev) => ({
        ...prev,
        [id]: "",
      }));

      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    } finally {
      setSendingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <div className="flex items-center gap-2 text-[#FF76B9]">
          <div className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin" />
          Loading queries...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-serif text-[#2b1b1f]">User Queries</h1>
        <p className="text-sm text-[#8b6a72] mt-1">
          Manage user messages & replies
        </p>
      </div>

      {/* TABLE */}
      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="bg-[#fff1f4] px-5 py-3 text-xs tracking-widest">
          USER MESSAGES
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-[#f3d2d9]">
              <tr>
                <th className="px-5 py-3 text-left">Message</th>
                <th className="px-5 py-3 text-left">Reply</th>
                <th className="px-5 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-[#a07a83]">
                    No queries found
                  </td>
                </tr>
              )}

              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-t border-[#f3d2d9] hover:bg-[#fff7f9]"
                >
                  {/* USER MESSAGE */}
                  <td className="px-5 py-3">{msg.message}</td>

                  {/* REPLY */}
                  <td className="px-5 py-3 text-[#6d4b53]">
                    {msg.reply ? (
                      msg.reply
                    ) : (
                      <input
                        type="text"
                        placeholder="Type reply..."
                        value={replyText[msg.id] || ""}
                        onChange={(e) =>
                          setReplyText({
                            ...replyText,
                            [msg.id]: e.target.value,
                          })
                        }
                        className="w-full border border-[#f3d2d9] rounded-lg px-3 py-1 outline-none"
                      />
                    )}
                  </td>

                  {/* ACTION */}
                  <td className="px-5 py-3 text-center">
                    {!msg.reply && (
                      <button
                        onClick={() => handleReply(msg.id)}
                        disabled={sendingId === msg.id}
                        className="px-4 py-1 text-xs bg-[#2b1b1f] text-white rounded-md cursor-pointer"
                      >
                        {sendingId === msg.id ? "Sending..." : "Send"}
                      </button>
                    )}

                    {msg.reply && (
                      <span className="text-green-600 text-xs font-medium">
                        Replied
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
