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
  Checkbox,
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
import { DropzoneDialog } from "material-ui-dropzone";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

interface UploadImageParams {
  image: FormData;
  id: number | undefined;
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
  const [questionId, setQuestionId] = useState<number>();
  const [isEditQuestion, setIsEditQuestion] = useState(false);

  const { fields, remove, swap } = useFieldArray({
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
  const { handleSubmit: handleQuestionSubmit, control: questionControl, reset: questionReset } = useForm<
    Partial<Question>
  >({
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
        push(`/exams/${examId}/groups`);
        showNotification({
          message: isEdit ? "Grupo de questões editado com sucesso" : "Grupo de questões criado com sucesso",
          type: "success",
        });
      },
      onError: () => {
        showNotification({
          message: "Ocorreu algum erro ao tentar adicionar as questões ao grupo de questões",
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
    ({ title, type, questions }) => {
      return apiClient.post(
        "/question-group",
        {
          title,
          class: type === "class" || undefined,
          personal: type === "personal" || undefined,
          examId: examId ? parseInt(examId, 10) : "",
        },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess: (newQuestionGroup, { questions }) => {
        if (questions.length > 0) {
          createQuestions({ questions, groupId: newQuestionGroup.data.data.id });
        } else {
          push(`/exams/${examId}/groups`);
        }
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

  const { mutate: uploadImage } = useMutation<ApiEntityWrapper<string>, Error, UploadImageParams>(
    ({ image }) => {
      return apiClient.post("/upload", image, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      onSuccess: (newImageUrl, { id }) => {
        if (id) {
          const values = getValues();
          const newQuestions = values.questions.map(question => {
            if (question.id === id) {
              return { ...question, imageUrl: newImageUrl.data.data };
            }

            return question;
          });
          setValue("questions", newQuestions);
        }
      },
    },
  );

  function questionSubmit(values: Partial<Question>) {
    const formValues = getValues();
    setValue("questions", [
      ...formValues.questions,
      { ...values, id: values.id ? values.id : `isNew-${uuidv4()}` },
    ] as any);
    questionReset({ required: false, statement: "" });
    setIsEditQuestion(false);
  }

  function handleRemoveItem(idx: number) {
    remove(idx);
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    swap(result.source.index, result.destination.index);
  }

  function handleEdit(id: number | string) {
    const values = getValues();

    const value = values.questions.find(question => {
      return question.id === id;
    });
    if (value) {
      const newQuestions = values.questions.filter(question => question.id !== id);

      setValue("questions", newQuestions);
      questionReset(value);
      setIsEditQuestion(true);
    }
  }

  function submit(values: QuestionGroup) {
    values.questions = values.questions.map(question => {
      if (typeof (question.id as any) === "string" && (question.id as any).includes("isNew")) {
        return {
          required: question.required,
          statement: question.statement,
          imageUrl: question.imageUrl,
          imageAlt: question.imageAlt,
          groupId: question.groupId,
        };
      }

      return question;
    });

    isEdit ? editQuestionGroup(values) : createQuestionGroup(values);
  }

  function handleSave(files: File[]) {
    setQuestionId(undefined);

    const [file] = files;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage({ image: formData, id: questionId });
    }
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
                      <FormLabel component="legend">Tipo do groupo de questões</FormLabel>
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
                  required: "Informe o enunciado da pergunta",
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <>
                      <StyledTextField
                        variant="outlined"
                        placeholder="Enunciado da pergunta"
                        value={value}
                        onChange={onChange}
                        error={Boolean(error)}
                        helperText={error?.message}
                      />
                    </>
                  );
                }}
              />
              <Controller
                name="required"
                control={questionControl}
                render={props => {
                  return (
                    <FormControlLabel
                      {...props}
                      checked={props.field.value}
                      control={<Checkbox color="primary" />}
                      label="Obrigatório"
                      onChange={props.field.onChange}
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
                {isEditQuestion ? "Editar questão" : "Adicionar questão"}
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
                      {fields.map(({ statement, id, imageUrl, required }: any, idx) => (
                        <Draggable key={`${id}`} draggableId={`${id}`} index={idx}>
                          {providedDraggable => (
                            <Grid item>
                              <QuestionCard
                                idx={idx}
                                title={`${statement} ${id}`}
                                isImage={Boolean(imageUrl)}
                                provided={providedDraggable}
                                dragHandleProps={providedDraggable.dragHandleProps}
                                draggableProps={providedDraggable.draggableProps}
                                onClickAddImage={() => {
                                  setQuestionId(id);
                                }}
                                onClickRemove={() => handleRemoveItem(idx)}
                                onClickEdit={() => handleEdit(id)}
                                required={required}
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
      <DropzoneDialog
        open={Boolean(questionId)}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        dropzoneText="Arraste o arquivo para esta área ou clique aqui"
        showPreviews={true}
        cancelButtonText="Cancelar"
        submitButtonText="Enviar"
        dialogTitle="Upload de imagem"
        filesLimit={1}
        maxFileSize={5000000}
        onClose={() => setQuestionId(undefined)}
      />
    </>
  );
}
