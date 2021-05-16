import { Button, TextField, Typography } from "@material-ui/core";
import { apiClient } from "../../../api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Container } from "./styles";
import { QuestionCard } from "../../../components/question-card";

interface IGroupQuestion {
  title: String;
  imageUrl: String;
}

export default function GroupQuestion() {
  const [questions, setQuestions] = useState<IGroupQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState<String>("");

  function handleAddItem() {
    const item: IGroupQuestion = {
      title: newQuestion,
      imageUrl: "",
    };
    setQuestions([...questions, item]);
  }

  function handleRemoveItem(id: Number) {
    const result = questions.filter((e, index) => index !== id);
    setQuestions(result);
    console.log("removido");
  }

  async function cretaeGroupQuestion() {
    try {
      const result = await apiClient.post("/question-group");
    } catch (error) {
      throw error.response.data;
    }
  }

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestions(items);
  }
  return (
    <Container>
      <Typography variant="h5" component="h2" style={{ marginBottom: 12 }}>
        Titulo do grupo
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Título do grupo"
        style={{ background: "#fff", marginBottom: 20 }}
        onChange={event => setNewQuestion(event.target.value)}
      />

      <Typography variant="h5" component="h2" style={{ marginBottom: 12 }}>
        Nome da questão
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Questão"
        style={{ background: "#fff" }}
        onChange={event => setNewQuestion(event.target.value)}
      />
      <Button variant="contained" color="secondary" size="small" onClick={handleAddItem} style={{ marginBottom: 20 }}>
        Adicionar questão
      </Button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {providedDroppable => (
            <div {...providedDroppable.droppableProps} ref={providedDroppable.innerRef}>
              {questions.map((e, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {providedDraggable => (
                    <QuestionCard
                      id={index}
                      title={e.title}
                      provided={providedDraggable}
                      dragHandleProps={providedDraggable.dragHandleProps}
                      draggableProps={providedDraggable.draggableProps}
                      onClickAddImage={() => {}}
                      onClickRemove={() => handleRemoveItem(index)}
                    />
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button id="send-button" variant="contained" color="primary" size="large" onClick={cretaeGroupQuestion}>
        Enviar
      </Button>
    </Container>
  );
}
