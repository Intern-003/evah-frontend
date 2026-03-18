import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // user not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // admin route but user is not admin
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
