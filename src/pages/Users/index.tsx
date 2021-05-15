import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { lazy } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { apiClient } from "../../api";
import { useQuery } from "react-query";
import { User } from "./types";
import { useAuthContext } from "../../stores";
import { ErrorView } from "../../components/ErrorView";
import { PageLoad } from "../../components/PageLoad";
import { PagesTitle } from "../../components/PagesTitle";

const Create = lazy(async () => import("./Create").then(m => ({ default: m.Create })));

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateButton = styled(Button)`
  align-self: flex-end;
`;

function Main() {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { user: token } = useAuthContext();
  const { data, isLoading, isError } = useQuery<any>("users", () => {
    return (apiClient.get("/user", { headers: { Authorization: `Bearer ${token}` } }) as unknown) as User;
  });

  function handleCreateClick() {
    push(`${url}/create`);
  }

  if (isLoading) {
    return <PageLoad />;
  }

  return (
    <MainWrapper>
      <CreateButton variant="contained" color="primary" onClick={handleCreateClick}>
        Cadastrar usuarios
      </CreateButton>
      {isError ? (
        <ErrorView>Houve algum erro na busca de usuários</ErrorView>
      ) : data && data.data && data.data.data ? (
        <PagesTitle>{data.data.data.cpf}</PagesTitle>
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
    </Switch>
  );
}
