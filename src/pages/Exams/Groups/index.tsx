import { Accordion, AccordionSummary, Button, Typography, AccordionActions } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { PagesTitle } from "../../../components/PagesTitle";
import { Exam, ExamRouteParams, QuestionGroup } from "../types";
import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../../api";
import { ApiEntityWrapper } from "../../../api/types";
import { useAuthContext, useNotificationContext } from "../../../stores";
import { PageLoad } from "../../../components/PageLoad";
import { Header } from "../styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import { QuestionList } from "./QuestionList";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import styled from "styled-components";
import SaveIcon from "@material-ui/icons/Save";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

interface UpdateGroupsPositionParams {
  examId: number;
  groupIds: number[];
}

const StyledButton = styled(Button)`
  margin: 1rem auto;
  display: flex;
  align-items: center;
`;

export function Groups() {
  const { user } = useAuthContext();
  const { push } = useHistory();
  const { showNotification } = useNotificationContext();
  const { examId } = useParams<ExamRouteParams>();
  const { data: exam, isLoading, refetch } = useQuery<ApiEntityWrapper<Exam>>(
    ["exam", examId],
    () => {
      return apiClient.get(`/exam/${examId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      enabled: Boolean(examId),
      onSuccess: newExam => setGroups(newExam.data.data.groups),
    },
  );
  const { mutate: updateGroupsPosition, isLoading: isLoadingUpdateGroupPosition } = useMutation(
    (data: UpdateGroupsPositionParams) => {
      return apiClient.patch("/question-group", data, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      onSettled: () => refetch(),
      onError: () =>
        showNotification({ message: "Ocorreu algum erro ao tentar reorganizar o grupo de questões", type: "error" }),
    },
  );
  const [groups, setGroups] = useState<QuestionGroup[]>([]);

  function handleCreateClick() {
    push(`/exams/${exam?.data.data.id}/question-group`);
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const reorderedGroups = reorder(groups, result.source.index, result.destination.index);

    setGroups(reorderedGroups);
  }

  function saveNewOrder() {
    if (!examId) {
      return;
    }

    updateGroupsPosition({ examId: parseInt(examId, 10), groupIds: groups.map(group => group.id) });
  }

  return (
    <>
      <Header>
        <PagesTitle>Grupos de questões</PagesTitle>
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Adicionar grupo de questões
        </Button>
      </Header>
      {isLoading || isLoadingUpdateGroupPosition ? (
        <PageLoad />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {groups.map((group, index) => {
                  return (
                    <Draggable key={group.id} draggableId={`${group.id}`} index={index}>
                      {provided => (
                        <Accordion
                          key={group.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{group.title}</Typography>
                          </AccordionSummary>
                          <QuestionList groupId={group.id} />
                          <AccordionActions>
                            <Button
                              size="small"
                              color="primary"
                              startIcon={<EditIcon />}
                              onClick={() => push(`/exams/${examId}/question-group/${group.id}`)}
                            >
                              Editar
                            </Button>
                          </AccordionActions>
                        </Accordion>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {groups.reduce((acc, group, currIndex) => {
        const previousIndex = (exam?.data.data.groups ?? []).findIndex(apiGroup => apiGroup.id === group.id);

        if (previousIndex !== currIndex) {
          return acc || true;
        }

        return false;
      }, false) && (
        <StyledButton color="primary" startIcon={<SaveIcon />} onClick={saveNewOrder}>
          Salvar ordem
        </StyledButton>
      )}
    </>
  );
}
