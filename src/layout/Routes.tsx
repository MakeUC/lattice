import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Reset from "../pages/auth/Reset";
import Notifications from "../pages/notifications/Notifications";
import Profile from "../pages/profile/Profile";
import ChangeProfile from "../pages/profile/ChangeProfile";
import Home from "../pages/home/Home";
import AuthRoute from "./AuthRoute";
import AppRoute from "./AppRoute";

const LatticeRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/register/:registrantId"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        ></Route>
        <Route
          path="/auth/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        ></Route>
        <Route
          path="/auth/reset/:resetToken"
          element={
            <AuthRoute>
              <Reset />
            </AuthRoute>
          }
        ></Route>
        <Route
          path="/notifications"
          element={
            <AppRoute>
              <Notifications />
            </AppRoute>
          }
        ></Route>
        <Route
          path="/profile/edit"
          element={
            <AppRoute>
              <ChangeProfile />
            </AppRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <AppRoute>
              <Profile />
            </AppRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <AppRoute>
              <Home />
            </AppRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default LatticeRoutes;
