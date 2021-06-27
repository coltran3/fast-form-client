/* eslint-disable no-useless-escape */
import { Switch, Route, useHistory, useRouteMatch, Redirect } from "react-router-dom";
import { lazy } from "react";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import styled from "styled-components";
import { apiClient } from "../../api";
import { useQuery } from "react-query";
import { User } from "./types";
import { useAuthContext } from "../../stores";
import { ErrorView } from "../../components/ErrorView";
import { PageLoad } from "../../components/PageLoad";
import { ApiEntityWrapper } from "../../api/types";
import { USER_ROLE_TRANSLATE_OBJ, USER_TYPE_TRANSLATE_OBJ } from "./constants";
import dayjs from "dayjs";
import { PagesTitle } from "../../components/PagesTitle";

const Create = lazy(async () => import("./Create").then(m => ({ default: m.Create })));

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Main() {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { user: token } = useAuthContext();
  const { data: user, isLoading, isError } = useQuery<ApiEntityWrapper<User>>("users", () => {
    return apiClient.get("/user", { headers: { Authorization: `Bearer ${token}` } });
  });

  function handleCreateClick() {
    push(`${url}/create`);
  }

  return (
    <MainWrapper>
      <Header>
        <PagesTitle>Usuário</PagesTitle>
        {user?.data.data.role !== "regular" && (
          <Button variant="contained" color="primary" onClick={handleCreateClick}>
            Cadastrar usuários
          </Button>
        )}
      </Header>
      {isLoading ? (
        <PageLoad />
      ) : isError ? (
        <ErrorView>Houve algum erro na busca de usuários</ErrorView>
      ) : user && user.data && user.data.data ? (
        <List>
          <ListItem>
            <ListItemText>
              CPF: {user.data.data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `***.\$2.\$3-***`)}
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>Matrícula: {user.data.data.enrollment}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>Tipo: {USER_TYPE_TRANSLATE_OBJ[user.data.data.type]}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>Função: {USER_ROLE_TRANSLATE_OBJ[user.data.data.role]}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>Data de criação: {dayjs(user.data.data.createdAt).format("DD/MM/YYYY")}</ListItemText>
          </ListItem>
        </List>
      ) : null}
    </MainWrapper>
  );
}

export function Users() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={Main} />
      <Route exact path={`${path}/create`} component={Create} />
      <Redirect to="/users" />
    </Switch>
  );
}
