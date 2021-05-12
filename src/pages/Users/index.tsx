import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { lazy } from "react";
import {
  Button,
  CircularProgress as MuiCircularProgress,
  FormHelperText as MuiFormHelperText,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { apiClient } from "../../api";
import { useQuery } from "react-query";
import { User } from "./types";
import ErrorIcon from "@material-ui/icons/Error";

const Create = lazy(async () => import("./Create").then(m => ({ default: m.Create })));

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateButton = styled(Button)`
  align-self: flex-end;
`;

const CircularProgress = styled(MuiCircularProgress)`
  margin: 0 auto;
  display: block;
`;

const FormHelperText = styled(MuiFormHelperText)`
  display: flex;
  flex-direction: column;
  font-size: 4rem;
  padding: 1.5rem 0;
  align-items: center;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  margin-bottom: 0.5rem;
`;

function Main() {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { data: user, isLoading, isError } = useQuery<User>("users", () => {
    return (apiClient.get("/user") as unknown) as User;
  });

  function handleCreateClick() {
    push(`${url}/create`);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <MainWrapper>
      <CreateButton variant="contained" color="primary" onClick={handleCreateClick}>
        Cadastrar usuarios
      </CreateButton>
      {isError ? (
        <FormHelperText error variant="outlined">
          <StyledErrorIcon fontSize="inherit" />
          <Typography variant="h4" gutterBottom>
            Houve algum erro
          </Typography>
        </FormHelperText>
      ) : (
        <div>blablabla deu bom {user}</div>
      )}
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
