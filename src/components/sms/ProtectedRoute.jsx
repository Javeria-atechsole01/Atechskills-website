import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/sms/login" />;
  if (role && user.role !== role) return <Navigate to="/sms/login" />;

  return children;
};

export default ProtectedRoute;
