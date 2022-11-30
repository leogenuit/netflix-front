import React from "react";
import useAuth from "../../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isLoggedIn, isLoading, currentUser } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/signin" />;
  if (!currentUser.isAdmin) return <Navigate to="/" />;
  else return <Outlet />;
};

export default AdminRoute;
