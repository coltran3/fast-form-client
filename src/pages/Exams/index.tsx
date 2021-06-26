import { lazy, useState } from "react";
import { Switch, Route, useHistory, useRouteMatch, Redirect } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Card from "../../components/Card";
import { GroupDisplaying } from "../../components/GroupDisplaying";
import { ContentContainer, Header } from "./styles";
import { ContentCard } from "./styles";
import { useQuery } from "react-query";
import { Exam, ExamsToAnswer } from "./types";
import { apiClient } from "../../api";
import { useAuthContext } from "../../stores";
import { ErrorView } from "../../components/ErrorView";
import { ApiEntityWrapper } from "../../api/types";
import { PageLoad } from "../../components/PageLoad";
import { FlexSpacer } from "../../components/FlexSpacer";
import { ExamsContext } from "./context";

const Create = lazy(async () => import("./Create").then(m => ({ default: m.Create })));
const GroupQuestion = lazy(async () => import("./GroupQuestion").then(m => ({ default: m.GroupQuestion })));
const Delete = lazy(async () => import("./Delete").then(m => ({ default: m.Delete })));
const Groups = lazy(async () => import("./Groups").then(m => ({ default: m.Groups })));
const Answer = lazy(async () => import("./Answer").then(m => ({ default: m.Answer })));

function Main() {
  const { push } = useHistory();
  const { user } = useAuthContext();
  const { url } = useRouteMatch();
  const { data: exams, isLoading, isError } = useQuery<ApiEntityWrapper<Exam[]>>(
    ["exams", url],
    () => {
      return apiClient.get("/exam", { headers: { Authorization: `Bearer ${user}` } });
    },
    { enabled: url === "/manage" },
  );

  console.log(url);

  const { data: examsToAnswer, isLoading: isLoadingExamsToAnswer, isError: isErrorExamsToAnswer } = useQuery<
    ApiEntityWrapper<ExamsToAnswer>
  >(
    ["examToAnswer", url],
    () => {
      return apiClient.get("/exam/me", { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      enabled: url === "/answer",
    },
  );

  function handleCreateClick() {
    push(`${url}/create`);
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Header>
          <FlexSpacer />
          {url === "/manage" && (
            <Button variant="contained" color="primary" onClick={handleCreateClick}>
              Cadastrar avaliações
            </Button>
          )}
        </Header>
      </Grid>

      {isLoading || isLoadingExamsToAnswer ? (
        <Grid item>
          <PageLoad />
        </Grid>
      ) : isError || isErrorExamsToAnswer ? (
        <Grid item>
          <ErrorView>Houve algum erro na busca de avaliações</ErrorView>
        </Grid>
      ) : (
        <>
          {exams && exams.data && exams.data.data && (
            <Grid item>
              <GroupDisplaying title="Minhas Avaliações" defaultDisplay>
                <ContentContainer>
                  {exams.data.data.map(({ id, title, startedAt }) => {
                    return (
                      <ContentCard key={id}>
                        <Card
                          title={title}
                          date={startedAt}
                          onClick={() => {
                            push(`${url}/${id}/groups`);
                          }}
                          onEdit={() => {
                            push(`${url}/edit/${id}`);
                          }}
                          onDelete={() => {
                            push(`${url}/delete/${id}`);
                          }}
                        />
                      </ContentCard>
                    );
                  })}
                </ContentContainer>
              </GroupDisplaying>
            </Grid>
          )}
          {examsToAnswer &&
            examsToAnswer.data &&
            examsToAnswer.data.data &&
            Boolean(examsToAnswer.data.data.alreadyAgreed.length) && (
              <Grid item>
                <GroupDisplaying title="Avaliações que comecei a responder" defaultDisplay>
                  <ContentContainer>
                    {examsToAnswer?.data.data.alreadyAgreed.map(({ id, title, startedAt }) => {
                      return (
                        <ContentCard key={id}>
                          <Card
                            title={title}
                            date={startedAt}
                            onClick={() => {
                              push(`${url}/answer/${id}`);
                            }}
                          />
                        </ContentCard>
                      );
                    })}
                  </ContentContainer>
                </GroupDisplaying>
              </Grid>
            )}
          {examsToAnswer &&
            examsToAnswer.data &&
            examsToAnswer.data.data &&
            Boolean(examsToAnswer.data.data.canAgree.length) && (
              <Grid item>
                <GroupDisplaying title="Avaliações para responder" defaultDisplay>
                  <ContentContainer>
                    {examsToAnswer?.data.data.canAgree.map(({ id, title, startedAt }) => {
                      return (
                        <ContentCard key={id}>
                          <Card
                            title={title}
                            date={startedAt}
                            onClick={() => {
                              push(`${url}/answer/${id}`);
                            }}
                          />
                        </ContentCard>
                      );
                    })}
                  </ContentContainer>
                </GroupDisplaying>
              </Grid>
            )}
        </>
      )}
    </Grid>
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
        <Route exact path={`${path}/answer/:examId`} component={Answer} />
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
