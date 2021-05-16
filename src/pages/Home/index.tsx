import React from "react";
import { GroupQuestion } from "../Exams/GroupQuestion";
import { StartedExam } from "../../components/StartedExam";
import Dialog from "@material-ui/core/Dialog";
import { Container } from "./styles";

export function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container>
      <StartedExam title="Criar Avaliação" description=" descrição" />
      <div className="divider"></div>
      <StartedExam title="Criar Grupo" description=" descrição" onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <GroupQuestion />
      </Dialog>
    </Container>
  );
}
