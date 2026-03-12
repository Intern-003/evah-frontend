import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import { usePut } from "../hooks/usePut";
import { useDelete } from "../hooks/useDelete";
import toast from "react-hot-toast";

export default function Account() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("orders");

  const { execute: logoutUser, loading } = usePost("logout");

  const {
    data: profileData,
    loading: profileLoading,
    refetch: refetchProfile,
  } = useGet("profile");

  const user = profileData?.user;

  const { executePut: updateProfile } = usePut();
  const [name, setName] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const { data: addressData, refetch: refetchAddress } = useGet("addresses");

  const addresses = addressData?.addresses || [];

  const { execute: addAddress } = usePost("addresses");

  const { executeDelete } = useDelete();

  const [openEdit, setOpenEdit] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await executeDelete(`addresses/${id}`);

      if (res?.success) {
        toast.success("Address deleted");

        refetchAddress();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <section className="bg-[#faf7f8] min-h-screen pb-20">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#6d4b53] hover:text-[#FF76B9] transition cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        {/* TOP NAV */}
        <div
          className="
            flex items-center justify-between mb-14
            bg-white/70 backdrop-blur-md
            border border-[#f3d2d9]
            shadow-[0_10px_40px_rgba(228,163,177,0.15)]
            rounded-full
            px-8 py-4
          "
        >
          {/* LEFT SIDE */}

          <div className="flex items-center gap-12">
            {/* LOGO */}

            <img
              src="/src/assets/images/Evah_logo.png"
              className="w-[90px] object-contain"
            />

            {/* NAV TABS */}

            <div className="flex gap-2 bg-[#FFF5F8] p-1 rounded-full">
              <button
                onClick={() => setTab("orders")}
                className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  tab === "orders"
                    ? "bg-gradient-to-r from-[#FF76B9] to-[#ffa3cf] text-white shadow-md"
                    : "text-[#6d4b53] hover:text-[#FF76B9] cursor-pointer"
                }
                `}
              >
                Orders
              </button>

              <button
                onClick={() => setTab("profile")}
                className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  tab === "profile"
                    ? "bg-gradient-to-r from-[#FF76B9] to-[#ffa3cf] text-white shadow-md"
                    : "text-[#6d4b53] hover:text-[#FF76B9] cursor-pointer"
                }
                `}
              >
                Profile
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <button
            onClick={handleLogout}
            disabled={loading}
            className="
              text-sm
              px-5 py-2
              rounded-full
              border border-[#f1cfd6]
              text-[#6d4b53]
              hover:bg-[#FFF1F6]
              hover:border-[#FF76B9]
              transition
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* ORDERS TAB */}

        {tab === "orders" && (
          <>
            <h2 className="text-2xl font-medium mb-6">Orders</h2>

            <div className="bg-white rounded-xl border border-gray-200 py-16 mb-40 text-center">
              <p className="text-lg font-medium">No orders yet</p>

              <p className="text-gray-500 mt-2">
                Go to store to place an order.
              </p>

              <button
                onClick={() => navigate("/shop-all")}
                className="mt-6 px-6 py-3 bg-[#FF76B9] text-white rounded-full cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          </>
        )}

        {/* PROFILE TAB */}

        {tab === "profile" && (
          <>
            <h2 className="text-2xl font-semibold text-[#2b1b1f] mb-8">
              Profile
            </h2>

            {/* PROFILE CARD */}

            <div className="bg-white rounded-2xl border border-[#f3d2d9] p-8 mb-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-[#8b6a72]">Name</p>
                  <p className="text-lg font-medium text-[#2b1b1f]">
                    {user?.name}
                    {user?.role === "admin" && (
                      <span
                        className="
                          text-[11px]
                          px-3 py-1 ml-2
                          rounded-full
                          bg-[#FFF1F6]
                          border border-[#FF76B9]
                          text-[#FF76B9]
                          font-medium
                          tracking-wide
                        "
                      >
                        ADMIN
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setName(user?.name || "");
                    setOpenEdit(true);
                  }}
                  className="text-[#FF76B9] text-sm hover:underline cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div>
                <p className="text-sm text-[#8b6a72]">Email</p>
                <p className="text-[#2b1b1f] mt-1">{user?.email}</p>
              </div>
            </div>

            {/* ADDRESS CARD */}

            <div className="bg-white rounded-2xl border border-[#f3d2d9] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-[#2b1b1f]">Addresses</h3>

                <button
                  onClick={() => setOpenAddress(true)}
                  className="text-[#FF76B9] text-sm hover:underline cursor-pointer"
                >
                  + Add
                </button>
              </div>

              <div className="bg-[#FFF5F8] border border-[#f3d2d9] rounded-xl p-4 text-sm text-[#8b6a72]">
                {addresses.length === 0 ? (
                  <div className="bg-[#FFF5F8] border border-[#f3d2d9] rounded-xl p-4 text-sm text-[#8b6a72]">
                    No addresses added
                  </div>
                ) : (
                  addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[#f3d2d9] rounded-xl p-4 text-sm relative"
                    >
                      {addr.first_name} {addr.last_name}
                      <br />
                      {addr.address}, {addr.city}
                      <br />
                      {addr.state} - {addr.zip}
                      <br />
                      {addr.phone}
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="absolute top-3 right-3 text-xs text-red-500 hover:underline cursor-pointer"
                      >
                        <i className="fa-solid fa-trash text-[11px]"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {openEdit && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Edit profile</h3>

                <button
                  onClick={() => setOpenEdit(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Full Name"
                  className="border border-[#f3d2d9] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#FF76B9] outline-none"
                />
              </div>

              <input
                value={user?.email}
                disabled
                className="border border-[#f3d2d9] rounded-lg px-4 py-3 w-full bg-gray-50"
              />

              <p className="text-xs text-gray-400 mt-2">
                This email is used for sign-in and order updates.
              </p>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setOpenEdit(false)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    try {
                      const res = await updateProfile("profile/update", {
                        name,
                      });

                      if (res?.success) {
                        toast.success("Profile updated successfully");

                        refetchProfile(); // refresh profile data
                        setOpenEdit(false);
                      }
                    } catch (err) {
                      toast.error("Profile update failed");
                    }
                  }}
                  className="bg-[#FF76B9] text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {openAddress && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[520px] rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Add address</h3>

                <button
                  onClick={() => setOpenAddress(false)}
                  className="text-gray-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <select className="border border-[#f3d2d9] rounded-lg px-4 py-3 w-full mb-4">
                <option>United States</option>
                <option>India</option>
              </select>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="border border-[#f3d2d9] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#FF76B9] outline-none"
                />

                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="border border-[#f3d2d9] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#FF76B9] outline-none"
                />
              </div>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address ( Apartment, suite, etc )"
                className="border border-[#f3d2d9] rounded-lg px-4 py-3 w-full mb-4 focus:ring-1 focus:ring-[#FF76B9] outline-none"
              />

              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="border border-[#f3d2d9] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#FF76B9] outline-none"
                />

                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="border border-[#f3d2d9] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#FF76B9] outline-none"
                />

                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="ZIP code"
                  className="border border-[#f3d2d9] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#FF76B9] outline-none"
                />
              </div>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="border border-[#f3d2d9] rounded-lg px-4 py-3 w-full mb-4 focus:ring-1 focus:ring-[#FF76B9] outline-none"
              />

              <label className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <input type="checkbox" />
                This is my default address
              </label>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setOpenAddress(false)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await addAddress({
                      first_name: firstName,
                      last_name: lastName,
                      address,
                      city,
                      state,
                      zip,
                      phone,
                    });

                    refetchAddress();
                    setOpenAddress(false);
                  }}
                  className="bg-[#FF76B9] text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
