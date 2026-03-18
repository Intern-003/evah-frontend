import { useState } from "react";
import { useGet } from "../../hooks/useGet";

export default function Customers() {
  const { data, loading } = useGet("admin/users");
  const { data: countData } = useGet("admin/users/count");

  const [search, setSearch] = useState("");

  const users = data?.users || [];
  const totalUsers = countData?.count || users.length;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-[#FF76B9]">
          <span className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm">Loading customers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-serif text-[#2b1b1f]">Customers</h1>

        <p className="text-sm text-[#8b6a72]">
          Manage and monitor all registered users.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        {/* TOTAL USERS */}
        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">TOTAL USERS</p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {totalUsers}
          </h2>
        </div>

        {/* ACTIVE USERS */}
        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">ACTIVE USERS</p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {users.length}
          </h2>
        </div>

        {/* NEW USERS */}
        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 shadow-sm">
          <p className="text-xs tracking-widest text-[#a07a83]">NEW USERS</p>

          <h2 className="text-3xl font-semibold text-[#2b1b1f] mt-2">
            {
              users.filter((u) => {
                const created = new Date(u.created_at);
                const today = new Date();
                return created.toDateString() === today.toDateString();
              }).length
            }
          </h2>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-[280px]
          border border-[#f1cfd6]
          rounded-xl
          px-4 py-2
          text-sm
          outline-none
          focus:border-[#FF76B9]
          focus:ring-2 focus:ring-[#FF76B9]/20
          "
        />
      </div>

      {/* TABLE */}
      <div className="border border-[#f3d2d9] rounded-xl overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full">
            {/* HEADER */}
            <thead className="bg-[#fff1f4] sticky top-0 text-xs tracking-widest text-[#2b1b1f]">
              <tr>
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Joined</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-sm text-[#a07a83]"
                  >
                    No customers found
                  </td>
                </tr>
              )}

              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#f3d2d9] text-sm text-[#2b1b1f]"
                >
                  <td className="px-5 py-3">#{user.id}</td>

                  <td className="px-5 py-3 font-medium">{user.name}</td>

                  <td className="px-5 py-3">{user.email}</td>

                  <td className="px-5 py-3">
                    {user.role === "admin" ? (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-md">
                        Admin
                      </span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
                        User
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3 text-[#6d4b53]">
                    {new Date(user.created_at).toLocaleDateString()}
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
