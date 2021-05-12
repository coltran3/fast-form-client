import React from "react";
import { Input } from "@material-ui/core";
import Card from "../../components/card";
import GroupDisplaying from "../../components/group-displaying";

import { Container, ContentCard } from "./styles";

export function Exams() {
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
  return (
    <Container>
      <div className="content-input">
        <Input placeholder="buscar avaliação" />
      </div>
      <GroupDisplaying title="Avalições recentes" children={<ContentCard>{mockCard.map(e => e)}</ContentCard>} />
      <GroupDisplaying title="Novo" children={<ContentCard>{mockCard.map(e => e)}</ContentCard>} />
      <GroupDisplaying title="Aberto" children={<>{mockCard.map(e => e)}</>} />
      <GroupDisplaying title="Não disponível" children={<>{mockCard.map(e => e)}</>} />
      <GroupDisplaying title="Concluído" children={<>{mockCard.map(e => e)}</>} />
    </Container>
  );
}
