import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/notifications">
          {/* <Notifications /> */}
        </Route>
        <Route path="/user">
          {/* <Users /> */}
        </Route>
        <Route path="/">
          {/* <Home /> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}