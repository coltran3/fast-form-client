import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { TopBar } from "../../components/Topbar";
import { useAuthContext } from "../../stores";
import { Container as MuiContainer } from "@material-ui/core";
import styled from "styled-components";

const Home = React.lazy(async () => import("../../pages/Home").then(m => ({ default: m.Home })));
const Exams = React.lazy(async () => import("../../pages/Exams").then(m => ({ default: m.Exams })));

const Container = styled(MuiContainer)`
  height: 100%;
  padding-top: 64px !important;
  overflow: auto;
`;

export function LoggedRoutes() {
  const { setUser } = useAuthContext();

  return (
    <Router>
      <TopBar logout={() => setUser("")} />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/exams" component={Exams} />
        </Switch>
      </Container>
    </Router>
  );
}
