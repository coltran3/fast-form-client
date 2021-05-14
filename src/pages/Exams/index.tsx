import { lazy } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { TextField, Button, InputAdornment, Grid } from "@material-ui/core";
import Card from "../../components/Card";
import { GroupDisplaying } from "../../components/GroupDisplaying";
import SearchIcon from "@material-ui/icons/Search";
import { Header } from "./styles";
import { ContentCard } from "./styles";

const Create = lazy(async () => import("./Create").then(m => ({ default: m.Create })));

const mockCard = [
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
  <Card title=" Lorem ipsum" status="aberto" />,
];

function Main() {
  const { push } = useHistory();
  const { url } = useRouteMatch();

  function handleCreateClick() {
    push(`${url}/create`);
  }

  return (
    <Grid container direction="column" alignItems="stretch" spacing={3}>
      <Grid item>
        <Create />
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
    </Grid>
  );
}

export function Exams() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={Main} />
      <Route exact path={`${path}/create`} component={Create} />
    </Switch>
  );
}
