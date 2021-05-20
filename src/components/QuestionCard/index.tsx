import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Card, CardActions, CardContent, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { FlexSpacer } from "../FlexSpacer";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  idx: number;
  title: String;
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

export function QuestionCard({
  idx,
  title,
  provided,
  onClickEdit,
  onClickAddImage,
  onClickRemove,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <StyledCard ref={provided.innerRef} {...draggableProps} {...dragHandleProps} className="card">
      <CardContent>
        <Typography variant="h6" component="h2" color="primary">
          {idx} - {title}
        </Typography>
      </CardContent>
      <FlexSpacer />
      <CardActions>
        <IconButton aria-label="edit" size="small" onClick={onClickEdit}>
          <EditIcon />
        </IconButton>

        <IconButton aria-label="delete" size="small" color="secondary" onClick={onClickRemove}>
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="image" size="small" onClick={onClickAddImage}>
          <ImageIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}
