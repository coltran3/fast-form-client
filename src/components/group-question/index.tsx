import { Button } from "@material-ui/core";
import { useState } from "react";
import { Container } from "./styles";

export default function GroupQuestion() {
  const [questions, setQuestions] = useState<String[]>([]);
  const [newQuestion, setNewQuestion] = useState<String>("");
  const handleAddItem = () => {
    setQuestions([...questions, newQuestion]);
    console.log("adicionado");
  };
  const handleRemoveItem = (id: Number) => {
    const result = questions.filter((e, index) => index !== id);
    setQuestions(result);
    console.log("removido");
  };
  return (
    <Container>
      <label>Título do grupo</label>
      <input placeholder="Título do grupo" onChange={event => setNewQuestion(event.target.value)} />

      <div className="add-question">
        <label>Questão</label>
        <input placeholder="Questão" onChange={event => setNewQuestion(event.target.value)} />
        <Button onClick={handleAddItem}>Adicionar questão</Button>
      </div>

      {questions.map((e, index) => (
        <div key={index} className="question">
          <span>{e}</span>
          <button onClick={() => handleRemoveItem(index)}>remover</button>
        </div>
      ))}
      <Button onClick={handleAddItem}>Enviar</Button>
    </Container>
  );
}
