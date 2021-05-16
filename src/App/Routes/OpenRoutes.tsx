import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React from "react";

const Login = React.lazy(async () => import("../../pages/Login").then(m => ({ default: m.Login })));

export function OpenRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
