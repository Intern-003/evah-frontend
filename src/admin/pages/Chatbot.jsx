import { useState } from "react";
import toast from "react-hot-toast";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { usePut } from "../../hooks/usePut";
import { useDelete } from "../../hooks/useDelete";

export default function ChatbotAdmin() {
  const { data, loading, refetch } = useGet("admin/chatbot");
  const { execute } = usePost("admin/chatbot");
  const { executePut } = usePut();
  const { executeDelete } = useDelete();

  const [form, setForm] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const chatbot = data?.questions || [];

  const handleSubmit = async () => {
    if (!form.question || !form.answer) {
      return toast.error("All fields required");
    }

    try {
      setSaving(true);

      if (editingId) {
        await executePut(`admin/chatbot/${editingId}`, form);
        toast.success("Updated successfully");
      } else {
        await execute(form);
        toast.success("Added successfully");
      }

      setForm({ question: "", answer: "" });
      setEditingId(null);
      refetch();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setForm({ question: item.question, answer: item.answer });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this?")) return;

    try {
      setDeletingId(id);
      await executeDelete(`admin/chatbot/${id}`);
      toast.success("Deleted");
      refetch();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <div className="flex items-center gap-2 text-[#FF76B9]">
          <div className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin" />
          Loading chatbot...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-serif text-[#2b1b1f]">Chatbot Manager</h1>
        <p className="text-sm text-[#8b6a72] mt-1">
          Manage automated responses for users
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 space-y-4">
        <input
          type="text"
          placeholder="Enter question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="w-full border border-[#f3d2d9] rounded-lg px-4 py-2 outline-none"
        />

        <textarea
          placeholder="Enter answer"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="w-full border border-[#f3d2d9] rounded-lg px-4 py-2 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2 bg-[#2b1b1f] text-white rounded-lg hover:opacity-90 cursor-pointer"
        >
          {saving ? "Saving..." : editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="bg-[#fff1f4] px-5 py-3 text-xs tracking-widest">
          CHATBOT DATA
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white border-b border-[#f3d2d9]">
              <tr>
                <th className="px-5 py-3 text-left">Question</th>
                <th className="px-5 py-3 text-left">Answer</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {chatbot.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-[#a07a83]">
                    No data found
                  </td>
                </tr>
              )}

              {chatbot.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#f3d2d9] hover:bg-[#fff7f9]"
                >
                  <td className="px-5 py-3">{item.question}</td>
                  <td className="px-5 py-3 text-[#6d4b53]">{item.answer}</td>
                  <td className="px-5 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-md cursor-pointer"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
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
