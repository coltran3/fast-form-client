import React from "react";
import { StartedExam } from "../../components/startedExam";
import { Container } from "./styles";

export function Home() {
  return (
    <Container>
      <StartedExam title="Criar Avaliação" description=" descrição" />
      <div className="divider"></div>
      <StartedExam title="Criar Grupo" description=" descrição" />
    </Container>
  );
}
