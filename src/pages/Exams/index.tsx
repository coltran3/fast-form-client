import React from "react";
import Card from "../../components/card";
import GroupDisplaying from "../../components/group-displaying";

import { Container, ContentCard } from "./styles";

export function Exams() {
  return (
    <Container>
      <GroupDisplaying
        title="Avalições recentes"
        children={
          <ContentCard>
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
          </ContentCard>
        }
      />
      <GroupDisplaying
        title="Novo"
        children={
          <ContentCard>
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
          </ContentCard>
        }
      />
      <GroupDisplaying
        title="Aberto"
        children={
          <>
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
          </>
        }
      />
      <GroupDisplaying
        title="Não disponível"
        children={
          <>
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
          </>
        }
      />
      <GroupDisplaying
        title="Concluído"
        children={
          <>
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
            <Card title=" Lorem ipsum" status="aberto" />
          </>
        }
      />
    </Container>
  );
}
