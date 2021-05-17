import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { PagesTitle } from "../../../components/PagesTitle";
import { Exam, ExamRouteParams } from "../types";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useQuery } from "react-query";
import { apiClient } from "../../../api";
import { ApiEntityWrapper } from "../../../api/types";
import { useAuthContext } from "../../../stores";
import { PageLoad } from "../../../components/PageLoad";

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

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

  return (
    <>
      <PagesTitle>Grupos</PagesTitle>
      {isLoading ? (
        <PageLoad />
      ) : (
        <List component="nav" aria-label="main mailbox folders">
          {exam?.data.data.groups.map(group => {
            return (
              <ListItemLink onClick={() => push(`/exams/${examId}/question-group/${group.id}`)}>
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
