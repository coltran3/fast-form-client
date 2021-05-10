import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { TopBar } from "../../components/Topbar";
import { useAuthContext } from "../../stores";

const Home = React.lazy(async () => import("../../pages/Home").then(m => ({ default: m.Home })));
const Exams = React.lazy(async () => import("../../pages/Exams").then(m => ({ default: m.Exams })));


export function LoggedRoutes() {
  const { setUser } = useAuthContext();

  return (
    <Router>
      <TopBar logout={() => setUser("")} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/exams" component={Exams} />
      </Switch>
    </Router>
  );
}
