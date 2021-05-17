import {
  Button,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { QuestionCard } from "../../../components/QuestionCard";
import styled from "styled-components";
import { PagesTitle } from "../../../components/PagesTitle";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ApiQuestionGroup, ExamRouteParams, Question, QuestionGroup } from "../types";
import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../../api";
import { useAuthContext, useNotificationContext } from "../../../stores";
import { useHistory, useParams } from "react-router";
import { ApiEntityWrapper } from "../../../api/types";
import { PageLoad } from "../../../components/PageLoad";

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface CreateQuestionParams {
  groupId: number;
  questions: Question[];
}

export function GroupQuestion() {
  const { examId, groupId } = useParams<ExamRouteParams>();
  const isEdit = Boolean(groupId);
  const { user } = useAuthContext();
  const { push } = useHistory();
  const { showNotification } = useNotificationContext();
  const { handleSubmit, control, reset, getValues, setValue } = useForm<QuestionGroup>({
    defaultValues: { title: "", type: "noType", questions: [] },
  });
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "questions",
  });
  const { isLoading: isLoadingQuestionGroup } = useQuery<ApiEntityWrapper<ApiQuestionGroup>>(
    ["questionGroup", groupId],
    () => {
      return apiClient.get(`/question-group/${groupId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      enabled: Boolean(groupId),
      onSuccess: newQuestionGroup => {
        reset({
          title: newQuestionGroup.data.data.title,
          type: newQuestionGroup.data.data.class
            ? "class"
            : newQuestionGroup.data.data.personal
            ? "personal"
            : "noType",
          questions: newQuestionGroup.data.data.questions,
        });
      },
    },
  );
  const { handleSubmit: handleQuestionSubmit, control: questionControl } = useForm({
    defaultValues: { statement: "", required: false },
  });
  const { mutate: createQuestions, isLoading: isLoadingCreateQuestions } = useMutation(
    ({ groupId, questions }: CreateQuestionParams) => {
      return apiClient.post(
        `/question${groupId ? `/${groupId}` : ""}`,
        { questions },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess: () => {
        push("/exams");
        showNotification({
          message: isEdit ? "Grupo de questões editado com sucesso" : "Grupo de questões criado com sucesso",
          type: "success",
        });
      },
      onError: () => {
        showNotification({
          message: "Ocorreu algum erro ao tentat adicionar as questões ao grupo de questões",
          type: "error",
        });
      },
    },
  );
  const { mutate: createQuestionGroup, isLoading: isLoadingCreateQuestionGroup } = useMutation<
    ApiEntityWrapper<QuestionGroup>,
    Error,
    Omit<QuestionGroup, "id">
  >(
    ({ title, type }) => {
      return apiClient.post(
        "/question-group",
        {
          title,
          class: type === "class",
          personal: type === "personal",
          examId: examId ? parseInt(examId, 10) : "",
        },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess: (newQuestionGroup, { questions }) => {
        createQuestions({ questions, groupId: newQuestionGroup.data.data.id });
      },
      onError: () => {
        showNotification({ message: "Ocorreu algum erro ao tentar criar o grupo de questões", type: "error" });
      },
    },
  );

  const { mutate: editQuestionGroup, isLoading: isLoadingEditQuestionGroup } = useMutation<
    ApiEntityWrapper<QuestionGroup>,
    Error,
    Omit<QuestionGroup, "id">
  >(
    ({ title, type }) => {
      return apiClient.put(
        `/question-group/${groupId}`,
        {
          title,
          class: type === "class",
          personal: type === "personal",
        },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess: (newQuestionGroup, { questions }) => {
        createQuestions({ questions, groupId: newQuestionGroup.data.data.id });
      },
      onError: () => {
        showNotification({ message: "Ocorreu algum erro ao tentar editar o grupo de questões", type: "error" });
      },
    },
  );

  function questionSubmit(values: Pick<Question, "statement" | "required">) {
    const formValues = getValues();
    setValue("questions", [...formValues.questions, values] as any);
  }

  function handleRemoveItem(idx: number) {
    remove(idx);
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    swap(result.source.index, result.destination.index);
  }

  function submit(values: QuestionGroup) {
    isEdit ? editQuestionGroup(values) : createQuestionGroup(values);
  }

  return (
    <>
      <PagesTitle>Grupo de questões</PagesTitle>
      {isLoadingQuestionGroup ? (
        <PageLoad />
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Informe o título do grupo",
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <StyledTextField
                      label="Título do grupo"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Tipo do group de questões</FormLabel>
                      <RadioGroup aria-label="type" name="type" value={value} onChange={onChange}>
                        <FormControlLabel value="class" control={<Radio color="primary" />} label="Matéria" />
                        <FormControlLabel value="personal" control={<Radio color="primary" />} label="Pessoal" />
                        <FormControlLabel value="noType" control={<Radio color="primary" />} label="Sem valor" />
                      </RadioGroup>
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="statement"
                control={questionControl}
                rules={{
                  required: "Informe o nome da questão",
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <StyledTextField
                      variant="outlined"
                      placeholder=" Nome da questão"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleQuestionSubmit(questionSubmit)}
              >
                Adicionar questão
              </StyledButton>
            </Grid>
            <Grid item xs={12}>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                  {providedDroppable => (
                    <Grid
                      item
                      container
                      spacing={3}
                      direction="column"
                      {...providedDroppable.droppableProps}
                      ref={providedDroppable.innerRef}
                    >
                      {fields.map(({ statement, id }, idx) => (
                        <Draggable key={`${id}`} draggableId={`${id}`} index={idx}>
                          {providedDraggable => (
                            <Grid item>
                              <QuestionCard
                                idx={idx}
                                title={statement}
                                provided={providedDraggable}
                                dragHandleProps={providedDraggable.dragHandleProps}
                                draggableProps={providedDraggable.draggableProps}
                                onClickAddImage={() => {}}
                                onClickRemove={() => handleRemoveItem(idx)}
                              />
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                      {providedDroppable.placeholder}
                    </Grid>
                  )}
                </Droppable>
              </DragDropContext>
            </Grid>

            <Grid item container justify="flex-end" xs={12}>
              <Button type="submit" variant="contained" color="primary" size="large">
                {isLoadingCreateQuestions || isLoadingCreateQuestionGroup || isLoadingEditQuestionGroup ? (
                  <CircularProgress color="secondary" size={26} />
                ) : isEdit ? (
                  "Editar"
                ) : (
                  "Criar"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
