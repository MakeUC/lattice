import React from "react";
import { useAuth } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { WrapperComponent } from "../interfaces/wrapper";

const AuthRoute: WrapperComponent = ({ children }) => {
  const { token } = useAuth();

  if (token) return <Navigate to="/" />;

  return <>{children}</>;
};

export default AuthRoute;
