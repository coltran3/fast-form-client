import { Container, Content } from "./styles";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
interface Icard {
  title: string;
  datetime?: Date;
  status: "aberto" | "fechado" | "recente" | "novo";
}

export default function Card({ title, datetime }: Icard) {
  return (
    <Container>
      <NewReleasesIcon />
      <Content>
        <strong>{title}</strong>
        <span>{datetime?.getDate ?? "datetim"}</span>
      </Content>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Container>
  );
}
