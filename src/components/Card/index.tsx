import { Container, Content, TitleAndDate } from "./styles";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { CardActions } from "@material-ui/core";

interface Icard {
  title: string;
  datetime?: Date;
  status: "aberto" | "fechado" | "recente" | "novo";
}

export default function Card({ title, datetime }: Icard) {
  return (
    <Container>
      <Content>
        <NewReleasesIcon />
        <TitleAndDate>
          <strong>{title}</strong>
          <span>{datetime?.getDate ?? "datetim"}</span>
        </TitleAndDate>
      </Content>
      <CardActions>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Container>
  );
}
