import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import { TopBar } from "../../components/Topbar";
import { useAuthContext } from "../../stores";
import { Container as MuiContainer } from "@material-ui/core";
import styled from "styled-components";
import { useQuery } from "react-query";
import { ApiEntityWrapper } from "../../api/types";
import { User } from "../../pages/Users/types";
import { apiClient } from "../../api";

const Exams = React.lazy(async () => import("../../pages/Exams").then(m => ({ default: m.Exams })));
const Users = React.lazy(async () => import("../../pages/Users").then(m => ({ default: m.Users })));

const Container = styled(MuiContainer)`
  height: 100%;
  padding-top: 96px;
`;

export function LoggedRoutes() {
  const { logout, user: token } = useAuthContext();
  const { data: user } = useQuery<ApiEntityWrapper<User>>("users", () => {
    return apiClient.get("/user", { headers: { Authorization: `Bearer ${token}` } });
  });

  return (
    <Router>
      <TopBar logout={logout} isManager={user?.data.data.role !== "regular"} />
      <Container>
        <Switch>
          {user?.data.data.role !== "regular" && <Route path="/exams" component={Exams} />}
          <Route path="/answer" component={Exams} />
          <Route path="/users" component={Users} />
          <Redirect to={user?.data.data.role !== "regular" ? "/exams" : "/answer"} />
        </Switch>
      </Container>
    </Router>
  );
}
