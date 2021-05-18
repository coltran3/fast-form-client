import { Accordion, AccordionSummary, Button, Typography, AccordionActions } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { PagesTitle } from "../../../components/PagesTitle";
import { Exam, ExamRouteParams } from "../types";
import { useQuery } from "react-query";
import { apiClient } from "../../../api";
import { ApiEntityWrapper } from "../../../api/types";
import { useAuthContext } from "../../../stores";
import { PageLoad } from "../../../components/PageLoad";
import { Header } from "../styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import { QuestionList } from "./QuestionList";

export function Groups() {
  const { user } = useAuthContext();
  const { push } = useHistory();
  const { examId } = useParams<ExamRouteParams>();
  const { data: exam, isLoading } = useQuery<ApiEntityWrapper<Exam>>(
    "exam",
    () => {
      return apiClient.get(`/exam/${examId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      enabled: Boolean(examId),
    },
  );

  function handleCreateClick() {
    push(`/exams/${exam?.data.data.id}/question-group`);
  }

  return (
    <>
      <Header>
        <PagesTitle>Grupos de questões</PagesTitle>
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Adicionar grupo de questões
        </Button>
      </Header>
      {isLoading ? (
        <PageLoad />
      ) : (
        <>
          {exam?.data.data.groups.map(group => {
            return (
              <>
                <Accordion key={group.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
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
              </>
            );
          })}
        </>
      )}
    </>
  );
}
