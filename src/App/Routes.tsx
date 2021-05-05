import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

const Login = React.lazy(async () => import("../pages/Login").then(m => ({ default: m.Login })));

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}
