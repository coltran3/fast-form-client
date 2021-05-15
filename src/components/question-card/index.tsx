import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Button, Card, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

interface Props {
  id: Number;
  title: String;
  onClickAddImage: () => void;
  onClickRemove: () => void;
  provided: DraggableProvided;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

export default function QuestionCard({
  id,
  title,
  provided,
  onClickAddImage,
  onClickRemove,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <Card ref={provided.innerRef} {...draggableProps} {...dragHandleProps} key={`${title} ${id}`} className="card">
      <Typography variant="h6" component="h2" color="primary">
        {id} - {title}
      </Typography>
      <CardActions>
        <Button variant="contained" size="small" onClick={onClickAddImage}>
          Adicionar Imagem
        </Button>
        <Button variant="contained" size="small" onClick={onClickRemove}>
          remover
        </Button>
      </CardActions>
    </Card>
  );
}
