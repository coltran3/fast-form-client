import { Button, List, ListItemIcon, ListItemText } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { PagesTitle } from "../../../components/PagesTitle";
import { Exam, ExamRouteParams } from "../types";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useQuery } from "react-query";
import { apiClient } from "../../../api";
import { ApiEntityWrapper } from "../../../api/types";
import { useAuthContext } from "../../../stores";
import { PageLoad } from "../../../components/PageLoad";
import { Header } from "../styles";
import { ListItemLink } from "./ListItemLink/ListItemLink";

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
        <List component="nav" aria-label="main mailbox folders">
          {exam?.data.data.groups.map(group => {
            return (
              <ListItemLink key={group.id} onClick={() => push(`/exams/${examId}/question-group/${group.id}`)}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText key={`${group.title}-${group.type}`} primary={group.title} />
              </ListItemLink>
            );
          })}
        </List>
      )}
    </>
  );
}
