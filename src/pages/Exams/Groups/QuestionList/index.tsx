import { AccordionDetails, AccordionDetailsProps, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useQuery } from "react-query";
import { apiClient } from "../../../../api";
import { ApiEntityWrapper } from "../../../../api/types";
import { useAuthContext } from "../../../../stores";
import { QuestionGroup } from "../../types";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { PageLoad } from "../../../../components/PageLoad";
import styled from "styled-components";

interface Props {
  groupId: number;
}

interface StyledAccordionDetailsProps extends AccordionDetailsProps {
  isLoading?: boolean;
}

const StyledAccordionDetails = styled(AccordionDetails)<StyledAccordionDetailsProps>`
  justify-content: ${props => (props.isLoading ? "center" : "flex-start")};
`;

export function QuestionList({ groupId }: Props) {
  const { user } = useAuthContext();
  const { data: group, isLoading } = useQuery<ApiEntityWrapper<QuestionGroup>>(["questionGroup", groupId], () => {
    return apiClient.get(`/question-group/${groupId}`, { headers: { Authorization: `Bearer ${user}` } });
  });

  return (
    <StyledAccordionDetails isLoading={isLoading}>
      <List component="nav" aria-label="main mailbox folders">
        {isLoading ? (
          <div style={{ width: "100%" }}>
            <PageLoad />
          </div>
        ) : (
          group?.data.data.questions.map(question => {
            return (
              <ListItem key={question.statement}>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText key={`${question.statement}-${"e"}`} primary={question.statement} />
              </ListItem>
            );
          })
        )}
      </List>
    </StyledAccordionDetails>
  );
}
