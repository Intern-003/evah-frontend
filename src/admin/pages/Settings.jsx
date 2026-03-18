import { useState } from "react";
import { useEffect } from "react";
import { useGet } from "../../hooks/useGet";
import { usePut } from "../../hooks/usePut";
import toast from "react-hot-toast";

export default function Settings() {
  const { data, loading } = useGet("settings");

  const { executePut } = usePut();

  const [settings, setSettings] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (data?.settings) {
      setSettings(data.settings);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-[#FF76B9]">
          <span className="w-5 h-5 border-2 border-[#FF76B9] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-sm">Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-[#2b1b1f]">
              Store Settings
            </h1>
            <p className="text-sm text-[#8b6a72] mt-1">
              Configure store information and system preferences.
            </p>
          </div>

          <button
            onClick={() => setOpenEdit(true)}
            className="
            px-5 py-2
            bg-[#FF76B9]
            text-white
            text-sm
            rounded-lg
            hover:opacity-90
            transition
          "
          >
            Edit Settings
          </button>
        </div>

        {/* STORE INFO */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-[#2b1b1f]">
            Store Information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-widest text-[#a07a83]">
                STORE DESCRIPTION
              </label>

              <input
                type="text"
                value={settings.store_description}
                className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
                readOnly
              />
            </div>

            <div>
              <label className="text-xs tracking-widest text-[#a07a83]">
                SUPPORT EMAIL
              </label>

              <input
                type="text"
                value={settings.email}
                className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-[#2b1b1f]">
            Contact Information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-widest text-[#a07a83]">
                PHONE NUMBER
              </label>

              <input
                type="text"
                value={settings.phone}
                className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
                readOnly
              />
            </div>

            <div>
              <label className="text-xs tracking-widest text-[#a07a83]">
                STORE ADDRESS
              </label>

              <input
                type="text"
                value={settings.address}
                className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* SHIPPING */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-[#2b1b1f]">
            Shipping Settings
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-widest text-[#a07a83]">
                SHIPPING FEE
              </label>

              <input
                type="text"
                value={`₹${settings.shipping_fee}`}
                className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
                readOnly
              />
            </div>

            <div>
              <label className="text-xs tracking-widest text-[#a07a83]">
                FREE SHIPPING ABOVE
              </label>

              <input
                type="text"
                value={`₹${settings.free_shipping_limit}`}
                className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* PAYMENT */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-medium text-[#2b1b1f]">
            Payment Settings
          </h2>

          <div>
            <label className="text-xs tracking-widest text-[#a07a83]">
              PAYMENT GATEWAY
            </label>

            <input
              type="text"
              value={settings.payment_mode}
              className="w-full mt-2 border border-[#f3d2d9] rounded-lg px-3 py-2 text-sm"
              readOnly
            />
          </div>
        </div>

        {/* MAINTENANCE */}

        <div className="bg-white border border-[#f3d2d9] rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-medium text-[#2b1b1f]">
            Maintenance Mode
          </h2>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6d4b53]">
              Temporarily disable the storefront for maintenance.
            </p>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  settings.maintenance
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-600"
                }
              `}
            >
              {settings.maintenance ? "Maintenance ON" : "Live"}
            </span>
          </div>
        </div>
      </div>

      {openEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-[640px] bg-white rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.15)] border border-[#f3d2d9] p-8">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-semibold text-[#2b1b1f]">
                  Edit Store Settings
                </h2>
                <p className="text-xs text-[#8b6a72] mt-1">
                  Update your store configuration
                </p>
              </div>

              <button
                onClick={() => setOpenEdit(false)}
                className="text-[#8b6a72] hover:text-black text-lg"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-5">
              <Input
                label="Store Description"
                value={settings.store_description || ""}
                onChange={(v) =>
                  setSettings({ ...settings, store_description: v })
                }
              />

              <Input
                label="Support Email"
                value={settings.email || ""}
                onChange={(v) => setSettings({ ...settings, email: v })}
              />

              <Input
                label="Phone Number"
                value={settings.phone || ""}
                onChange={(v) => setSettings({ ...settings, phone: v })}
              />

              <Input
                label="Address"
                value={settings.address || ""}
                onChange={(v) => setSettings({ ...settings, address: v })}
              />

              <Input
                label="Shipping Fee"
                value={settings.shipping_fee || ""}
                onChange={(v) => setSettings({ ...settings, shipping_fee: v })}
              />

              <Input
                label="Free Shipping Limit"
                value={settings.free_shipping_limit || ""}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    free_shipping_limit: v,
                  })
                }
              />
            </div>

            <div className="col-span-2 flex items-center justify-between mt-4 border-t pt-4">
              <div>
                <p className="text-sm font-medium text-[#2b1b1f]">
                  Maintenance Mode
                </p>
                <p className="text-xs text-[#8b6a72]">
                  Disable website for users temporarily
                </p>
              </div>

              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    maintenance: settings.maintenance ? 0 : 1,
                  })
                }
                className={`
                  relative w-12 h-6 rounded-full transition
                  ${settings.maintenance ? "bg-[#FF76B9]" : "bg-gray-300"}
                `}
                // value={settings.maintenance ?? 0}
              >
                <span
                  className={`
                    absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition
                    ${settings.maintenance ? "translate-x-6" : ""}
                  `}
                />
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={() => setOpenEdit(false)}
                className="text-sm text-[#8b6a72] hover:text-black transition"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    await executePut("admin/set-settings", settings);

                    toast.success("Settings updated successfully");

                    setOpenEdit(false);
                  } catch {
                    toast.error("Update failed");
                  }
                }}
                className="
                  px-8 py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-[#FF76B9]
                  to-[#ffa3cf]
                  text-white
                  text-sm
                  font-medium
                  shadow-[0_15px_40px_rgba(255,118,185,0.4)]
                  hover:scale-[1.02]
                  active:scale-[0.97]
                  transition
                "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-[#8b6a72] mb-1">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          px-4 py-2.5
          rounded-lg
          border border-[#f3d2d9]
          text-sm
          outline-none
          focus:ring-1
          focus:ring-[#FF76B9]/40
          focus:border-[#FF76B9]
          transition
        "
      />
    </div>
  );
}
