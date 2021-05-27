import { lazy, useState } from "react";
import { Switch, Route, useHistory, useRouteMatch, Redirect } from "react-router-dom";
import { TextField, Button, InputAdornment, Grid } from "@material-ui/core";
import Card from "../../components/Card";
import { GroupDisplaying } from "../../components/GroupDisplaying";
import SearchIcon from "@material-ui/icons/Search";
import { Header } from "./styles";
import { ContentCard } from "./styles";
import { useQuery } from "react-query";
import { Exam } from "./types";
import { apiClient } from "../../api";
import { useAuthContext } from "../../stores";
import { ErrorView } from "../../components/ErrorView";
import { ApiEntityWrapper } from "../../api/types";
import { PageLoad } from "../../components/PageLoad";
import { ExamsContext } from "./context";

const Create = lazy(async () => import("./Create").then(m => ({ default: m.Create })));
const GroupQuestion = lazy(async () => import("./GroupQuestion").then(m => ({ default: m.GroupQuestion })));
const Delete = lazy(async () => import("./Delete").then(m => ({ default: m.Delete })));
const Groups = lazy(async () => import("./Groups").then(m => ({ default: m.Groups })));

function Main() {
  const { push } = useHistory();
  const { user } = useAuthContext();
  const { url } = useRouteMatch();
  const { data: exams, isLoading, isError } = useQuery<ApiEntityWrapper<Exam[]>>("exams", () => {
    return apiClient.get("/exam", { headers: { Authorization: `Bearer ${user}` } });
  });

  function handleCreateClick() {
    push(`${url}/create`);
  }

  return (
    <>
      <Grid container direction="column" alignItems="stretch" spacing={3}>
        <Grid item>
          <Header>
            <TextField
              label="Buscar avaliação"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon classes={{ root: "searchIcon" }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={handleCreateClick}>
              Cadastrar avaliações
            </Button>
          </Header>
        </Grid>

        {isLoading ? (
          <PageLoad />
        ) : isError ? (
          <ErrorView>Houve algum erro na busca de usuários</ErrorView>
        ) : exams && exams.data && exams.data.data ? (
          <>
            <Grid item>
              <GroupDisplaying title="Minhas Avaliações" defaultDisplay>
                <ContentCard>
                  {exams.data.data.map(({ id, title, startedAt, ...teste }) => {
                    return (
                      <Card
                        key={id}
                        title={title}
                        date={startedAt}
                        onClick={() => {
                          push(`${url}/${id}/groups/`);
                        }}
                        onEdit={() => {
                          push(`${url}/edit/${id}`);
                        }}
                        onDelete={() => {
                          push(`${url}/delete/${id}`);
                        }}
                      />
                    );
                  })}
                </ContentCard>
              </GroupDisplaying>
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
}

export function Exams() {
  const { path } = useRouteMatch();
  const [exam, setExam] = useState<Exam>();

  return (
    <ExamsContext.Provider value={{ exam, setExam }}>
      <Switch>
        <Route exact path={[`${path}`, `${path}/delete/:examId`]}>
          <Main />
          <Route exact path={`${path}/delete/:examId`} component={Delete} />
        </Route>
        <Route exact path={`${path}/:examId/groups`} component={Groups} />
        <Route exact path={[`${path}/create`, `${path}/edit/:examId`]} component={Create} />
        <Route
          exact
          path={[`${path}/:examId/question-group`, `${path}/:examId/question-group/:groupId`]}
          component={GroupQuestion}
        />
        <Redirect to="/exams" />
      </Switch>
    </ExamsContext.Provider>
  );
}

/*

  <Grid item>
            <GroupDisplaying title="Avalições recentes">
              <ContentCard>{mockCard}</ContentCard>
            </GroupDisplaying>
          </Grid>

          <Grid item>
            <GroupDisplaying title="Novo">
              <ContentCard>{mockCard}</ContentCard>
            </GroupDisplaying>
          </Grid>

          <Grid item>
            <GroupDisplaying title="Aberto">
              <ContentCard>{mockCard}</ContentCard>
            </GroupDisplaying>
          </Grid>

          <Grid item>
            <GroupDisplaying title="Não disponível">
              <ContentCard>{mockCard}</ContentCard>
            </GroupDisplaying>
          </Grid>

          <Grid item>
            <GroupDisplaying title="Concluído">
              <ContentCard>{mockCard}</ContentCard>
            </GroupDisplaying>
          </Grid>


*/
