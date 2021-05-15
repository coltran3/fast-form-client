import { Container, Content, TitleAndDate, NewReleasesIcon } from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { CardActions } from "@material-ui/core";
import dayjs from "dayjs";

interface Icard {
  title: string;
  date?: string;
  // status: "aberto" | "fechado" | "recente" | "novo";
}

export default function Card({ title, date }: Icard) {
  const formatedDate = Boolean(date) ? dayjs(date).format("DD/MM/YYYY") : undefined;

  return (
    <Container>
      <Content>
        <NewReleasesIcon />
        <TitleAndDate>
          <strong>{title}</strong>
          {formatedDate && <span>{formatedDate}</span>}
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
