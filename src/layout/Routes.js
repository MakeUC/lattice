import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Notifications from '../pages/notifications/Notifications';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';

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
          {/* <Reset /> */}
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {children}
    </BrowserRouter>
  );
}