import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { FlexSpacer } from "../../components/FlexSpacer";

interface Props {
  logout: () => void;
}

export function TopBar({ logout }: Props): JSX.Element {
  const { push } = useHistory();

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => push("/exams")}>
          <RateReviewIcon />
        </IconButton>
        <Button color="inherit" onClick={() => push("/exams")}>
          Gerenciar
        </Button>
        <Button color="inherit" onClick={() => push("/answer")}>
          Responder
        </Button>
        <Button color="inherit" onClick={() => push("/users")}>
          Usuário
        </Button>
        <FlexSpacer />
        <IconButton edge="end" color="inherit" onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
