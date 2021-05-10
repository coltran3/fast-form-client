import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";

const Spacer = styled.div`
  flex-grow: 1;
`;

interface Props {
  logout: () => void;
 
}

export function TopBar({ logout }: Props): JSX.Element {
  const history = useHistory();

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <RateReviewIcon />
        </IconButton>
        <Button color="inherit">Criar avaliação</Button>
        <Button color="inherit" onClick={()=>history.push("/exams") }>Minhas avaliações</Button>
        <Button color="inherit">Buscar avaliações</Button>
        <Button color="inherit">Histórico</Button>
        <Spacer />
        <IconButton edge="end" color="inherit" onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
