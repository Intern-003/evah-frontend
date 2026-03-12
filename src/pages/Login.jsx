import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePost } from "../hooks/usePost"; // adjust path if needed

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | register

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const {
    execute: registerUser,
    loading: registerLoading,
    error: registerError,
    setError: setRegisterError,
  } = usePost("register");

  const {
    execute: loginUser,
    loading: loginLoading,
    error: loginError,
    setError: setLoginError,
  } = usePost("login");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ================= REGISTER =================
      if (mode === "register") {
        setRegisterError(null);

        await registerUser(form);

        // After successful register
        setMode("login"); // switch to login tab
        setForm({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        alert("Registration successful! Please login now.");
      }

      // ================= LOGIN =================
      else {
        setLoginError(null);

        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        if (res?.token) {
          localStorage.setItem("token", res.token);

          toast.success("Login successful!");

          navigate("/");
        }
      }
    } catch (err) {
      console.log("Auth Error:", err);
    }
  };

  const loading = registerLoading || loginLoading;
  const error = registerError || loginError;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <section className="min-h-screen bg-[#FFE8EB] flex items-center justify-center px-6 relative">
      <div className="w-full max-w-[420px] bg-white rounded-[28px] shadow-[0_25px_60px_rgba(255,118,185,0.25)] p-8 relative">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#6d4b53] hover:text-[#FF76B9] transition"
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

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] tracking-[0.35em] font-medium text-[#2b1b1f]">
            EVAH
          </h1>
          <p className="text-sm text-[#6d4b53] mt-2">
            {mode === "login"
              ? "Welcome back. Please sign in."
              : "Create your Evah account"}
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex bg-[#FFE8EB] rounded-full p-1 mb-8">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              mode === "login"
                ? "bg-white text-[#FF76B9] shadow"
                : "text-[#6d4b53]"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              mode === "register"
                ? "bg-white text-[#FF76B9] shadow"
                : "text-[#6d4b53]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-xs text-center mb-3">
            {typeof error === "string"
              ? error
              : error?.message || JSON.stringify(error)}
          </p>
        )}

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* NAME (REGISTER ONLY) */}
          {mode === "register" && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF76B9]/30 text-sm outline-none focus:border-[#FF76B9]"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 rounded-full border border-[#FF76B9]/30 text-sm outline-none focus:border-[#FF76B9]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-5 py-3 rounded-full border border-[#FF76B9]/30 text-sm outline-none focus:border-[#FF76B9]"
          />

          {/* CONFIRM PASSWORD */}
          {mode === "register" && (
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-5 py-3 rounded-full border border-[#FF76B9]/30 text-sm outline-none focus:border-[#FF76B9]"
            />
          )}

          {/* FORGOT PASSWORD */}
          {mode === "login" && (
            <div className="text-right">
              <button
                type="button"
                className="text-xs text-[#FF76B9] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-[999px_999px_18px_999px] bg-[linear-gradient(135deg,#FF76B9,#FF9FCC)] text-white text-[11px] tracking-[0.35em] font-medium shadow-[0_12px_28px_rgba(255,118,185,0.45)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(255,118,185,0.55)] disabled:opacity-70"
          >
            {loading
              ? "PLEASE WAIT..."
              : mode === "login"
                ? "SIGN IN"
                : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-[#6d4b53] mt-6">
          By continuing, you agree to Evah’s Terms & Privacy Policy
        </p>
      </div>
    </section>
  );
}
