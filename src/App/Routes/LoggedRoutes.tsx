import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import { TopBar } from "../../components/Topbar";
import { useAuthContext } from "../../stores";
import { Container as MuiContainer } from "@material-ui/core";
import styled from "styled-components";

const Exams = React.lazy(async () => import("../../pages/Exams").then(m => ({ default: m.Exams })));
const Users = React.lazy(async () => import("../../pages/Users").then(m => ({ default: m.Users })));

const Container = styled(MuiContainer)`
  height: 100%;
  padding-top: 96px;
`;

export function LoggedRoutes() {
  const { logout } = useAuthContext();

  return (
    <Router>
      <TopBar logout={logout} />
      <Container>
        <Switch>
          <Route path="/exams" component={Exams} />
          <Route path="/users" component={Users} />
          <Redirect to="/exams" />
        </Switch>
      </Container>
    </Router>
  );
}
