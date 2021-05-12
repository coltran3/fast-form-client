import { Modal } from "@material-ui/core";
import React from "react";
import GroupQuestion from "../../components/group-question";
import { StartedExam } from "../../components/startedExam";
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <GroupQuestion />
      </Modal>
    </Container>
  );
}
