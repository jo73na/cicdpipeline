import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from './Cookies';

const ProtectedRoute = ({ children }) => {
  // Get the current path from the URL
  const location = window.location.pathname;

  // Allow access to login and signup pages without authentication
  if (location === '/login' || location === '/signup') {
    return children; // Allow access to login and signup
  }

  // Check for the necessary cookies for protected routes
  const isAdmin = Cookies.get("is_admin");
  const adminToken = Cookies.get("admin_token");

  // Redirect to login if the necessary cookies are not set
  if (!isAdmin || !adminToken || isAdmin === "undefined" || adminToken === "undefined" || !isAdmin && !adminToken) {
    return <Navigate to="/login" />;
  }

  // Render the protected children if all checks pass
  return children;
};

export default ProtectedRoute;
