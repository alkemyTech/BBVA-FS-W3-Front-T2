import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const jwt = localStorage.getItem("jwt");
  return jwt ? <Outlet /> : <Navigate to="/login" />;
}
