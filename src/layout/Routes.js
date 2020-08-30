import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Notifications from '../pages/notifications/Notifications';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChangeProfile from "../pages/profile/ChangeProfile";

export default function({ children }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/register">
          <Register />
        </Route>
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="/auth/reset">
          <ForgotPassword />
        </Route>
        <Route path="/notifications">
          <Notifications />
          {children}
        </Route>
        <Route path="/profile">
          <Profile />
          {children}
        </Route>
        <Route path="/your_profile">
          <ChangeProfile />
          {children}
        </Route>
        <Route path="/">
          <Home />
          {children}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}