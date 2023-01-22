import React from "react";
import { Navigate } from "react-router-dom";
import { WrapperComponent } from "../interfaces/wrapper";
import { useAuth } from "../providers/AuthProvider";
import Navigation from "./Navigation";

const AppRoute: WrapperComponent = ({ children }) => {
  const { token } = useAuth();

  if (token === null) return <Navigate to="/auth/login" />;

  return (
    <>
      {children}
      <Navigation />
    </>
  );
};

export default AppRoute;
