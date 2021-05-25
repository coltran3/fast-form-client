import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Card, CardActions, CardContent, IconButton, Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { FlexSpacer } from "../FlexSpacer";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import EditIcon from "@material-ui/icons/Edit";
import SmsFailedRoundedIcon from "@material-ui/icons/SmsFailedRounded";

interface Props {
  idx: number;
  title: String;
  isImage?: boolean;
  onClickEdit: () => void;
  onClickAddImage: () => void;
  onClickRemove: () => void;
  provided: DraggableProvided;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
`;

const StyledSmsFailedRoundedIcon = styled(SmsFailedRoundedIcon)`
  margin-left: 1rem;
`;

export function QuestionCard({
  idx,
  title,
  isImage,
  provided,
  onClickEdit,
  onClickAddImage,
  onClickRemove,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <StyledCard ref={provided.innerRef} {...draggableProps} {...dragHandleProps} className="card">
      <StyledCardContent>
        <Typography variant="h6" component="h2" color="primary">
          {idx} - {title}
        </Typography>

        <Tooltip title="Essa pergunta é obrigatória">
          <StyledSmsFailedRoundedIcon type="filled" color="primary" />
        </Tooltip>
      </StyledCardContent>
      <FlexSpacer />
      <CardActions>
        <IconButton aria-label="edit" size="small" color="primary" onClick={onClickEdit}>
          <EditIcon />
        </IconButton>

        <IconButton aria-label="delete" size="small" color="secondary" onClick={onClickRemove}>
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="image" size="small" onClick={onClickAddImage}>
          <ImageIcon style={{ color: isImage ? "green" : "grey" }} />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}
