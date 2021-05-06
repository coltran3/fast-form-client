import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { TopBar } from "../../components/Topbar";

const Home = React.lazy(async () => import("../../pages/Home").then(m => ({ default: m.Home })));

export function LoggedRoutes() {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
