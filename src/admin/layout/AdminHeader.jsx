import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-[#f3d2d9] px-10 py-5 flex justify-between items-center">
      <h2 className="text-lg font-medium text-[#2b1b1f]">Admin Dashboard</h2>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/")}
          className="text-[#6d4b53] hover:text-[#FF76B9] cursor-pointer"
        >
          Home?
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF76B9] text-white rounded-full flex items-center justify-center">
            A
          </div>

          <span className="text-sm text-[#2b1b1f]">Admin</span>
        </div>
      </div>
    </header>
  );
}
