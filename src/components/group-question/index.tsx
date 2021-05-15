import { Button, Card, CardActions, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { apiClient } from "../../api";

import { useState } from "react";
import { Container } from "./styles";

interface IGroupQuestion {
  title: String;
  imageUrl: String;
}

export default function GroupQuestion() {
  const [questions, setQuestions] = useState<IGroupQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState<String>("");
  const handleAddItem = () => {
    const item: IGroupQuestion = {
      title: newQuestion,
      imageUrl: "",
    };
    setQuestions([...questions, item]);
  };
  const handleRemoveItem = (id: Number) => {
    const result = questions.filter((e, index) => index !== id);
    setQuestions(result);
    console.log("removido");
  };

  async function cretaeGroupQuestion() {
    try {
      const result = await apiClient.post("/question-group");
    } catch (error) {
      throw error.response.data;
    }
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

      {questions.map((e, index) => (
        <Card key={`${e} ${index}`} className="card">
          <Typography variant="h6" component="h2" color="primary">
            {index} - {e.title}
          </Typography>
          <CardActions>
            <Button variant="contained" size="small" onClick={() => handleRemoveItem(index)}>
              Adicionar Imagem
            </Button>
            <Button variant="contained" size="small" onClick={() => handleRemoveItem(index)}>
              remover
            </Button>
          </CardActions>
        </Card>
      ))}
      <Button id="send-button" variant="contained" color="primary" size="large" onClick={cretaeGroupQuestion}>
        Enviar
      </Button>
    </Container>
  );
}
