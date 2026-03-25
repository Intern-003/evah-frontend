import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";

import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import ShopAll from "./pages/ShopAll";
import NewArrivals from "./pages/NewArrivals";
import ProductDetails from "./pages/ProductDetails";
import GiftCollections from "./pages/GiftCollections";
import HomeFragrance from "./pages/HomeFragrance";
import Attars from "./pages/Attars";
import AquaPerfume from "./pages/AquaPerfume";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Reviews from "./pages/Reviews";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsConditions from "./pages/TermsConditions";

import CheckoutPage from "./pages/CheckoutPage";
import PaymentWaiting from "./pages/PaymentWaiting";
import OrderSuccess from "./pages/OrderSuccess";
import Cart from "./pages/Cart";

import AdminLayout from "./admin/layout/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Customers from "./admin/pages/Customers";
import ReviewsAdmin from "./admin/pages/Reviews";
import ChatbotAdmin from "./admin/pages/Chatbot";
import Coupons from "./admin/pages/Coupons";
import Settings from "./admin/pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Chatbot from "./components/Chatbot";

function App() {
  const location = useLocation();

  // 🔥 Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide header/footer on this pages
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/checkout" ||
    location.pathname === "/payment" ||
    location.pathname === "/order-success" ||
    location.pathname === "/track-order" ||
    location.pathname === "/profile" ||
    location.pathname.startsWith("/orders/") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "linear-gradient(135deg, #FFF0F5, #FFE4EC)",
            color: "#2b1b1f",
            border: "1px solid #FF76B9",
            padding: "14px 18px",
            borderRadius: "18px",
            boxShadow: "0 18px 45px rgba(255,118,185,0.35)",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#FF76B9",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e11d48",
              secondary: "#fff",
            },
          },
        }}
      />

      {!hideLayout && <AnnouncementBar />}
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Wishlist" element={<Wishlist />} />

        {/* 🔒 Protected Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route path="/shop-all" element={<ShopAll />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/gifts" element={<GiftCollections />} />
        <Route path="/home-fragrance" element={<HomeFragrance />} />
        <Route path="/attars" element={<Attars />} />
        <Route path="/aqua-perfume" element={<AquaPerfume />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentWaiting />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/Cart" element={<Cart />} />

        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reviews" element={<ReviewsAdmin />} />
          <Route path="Chatbot" element={<ChatbotAdmin />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}

      <ScrollToTopButton />

      {!hideLayout && <Chatbot />}
    </>
  );
}

export default App;
