import { Button } from "@material-ui/core";
import { Container } from "./styles";
interface Props {
  title: String;
  description: String;
  labelButton?: String;
  onClick?: () => void;
}
export function StartedExam(props: Props) {
  return (
    <Container>
      <h3>{props.title}</h3>
      <span>{props.description}</span>
      <Button onClick={props.onClick}>{props.labelButton ?? "Começar"}</Button>
    </Container>
  );
}
