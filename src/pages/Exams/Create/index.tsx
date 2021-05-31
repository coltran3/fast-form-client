import { PagesTitle } from "../../../components/PagesTitle";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { useMutation, useQuery } from "react-query";
import { apiClient } from "../../../api";
import { Exam, ExamRouteParams } from "../types";
import { useAuthContext, useNotificationContext } from "../../../stores";
import { useHistory, useParams } from "react-router";
import { ApiEntityWrapper } from "../../../api/types";
import { useExamsContext } from "../context";
import { PageLoad } from "../../../components/PageLoad";
import { FullWidthFormControl } from "../../../components/FullWidthFormControl";
import { useState } from "react";

const StyledTextField = styled(TextField)`
  width: 100%;
`;

interface CopyExamParams {
  groupId: number;
  examId: number;
}

export function Create() {
  const { user } = useAuthContext();
  const { examId } = useParams<ExamRouteParams>();
  const { setExam } = useExamsContext();
  const { showNotification } = useNotificationContext();
  const { push } = useHistory();
  const [examToBeCopiedId, setExamToBeCopiedId] = useState<number | "">("");

  const { data: exams, isLoading: isLoadingExams } = useQuery<ApiEntityWrapper<Exam[]>>("exams", () => {
    return apiClient.get("/exam", { headers: { Authorization: `Bearer ${user}` } });
  });

  const { data: exam, isLoading: isLoadingExam } = useQuery<ApiEntityWrapper<Exam>>(
    ["exam", examId],
    () => {
      return apiClient.get(`/exam/${examId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      enabled: Boolean(examId),
      onSuccess: newExam => {
        reset({
          title: newExam.data.data.title,
          description: newExam.data.data.description,
          startedAt: dayjs(newExam.data.data.startedAt).format("YYYY-MM-DD"),
          endedAt: dayjs(newExam.data.data.endedAt).format("YYYY-MM-DD"),
          allowAnonymous: newExam.data.data.allowAnonymous,
        });
      },
    },
  );

  const { isLoading: isLoadingExamTarget } = useQuery(
    "examTarget",
    () => {
      return apiClient.get("/exam-target", { headers: { Authorization: `Bearer ${user}` } });
    },
    { onSuccess: s => console.log(s) },
  );

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { title: "", description: "", startedAt: "", endedAt: "", allowAnonymous: false },
    resolver: values => {
      if (values.title === "") {
        return { values, errors: { title: { type: "required", message: "Informe o titulo da avaliação" } } };
      }

      if (values.startedAt === "") {
        return {
          values,
          errors: { startedAt: { type: "required", message: "Informe a data de inicio da avaliação" } },
        };
      }

      if (dayjs(values.startedAt).isBefore(dayjs().subtract(1, "day"))) {
        return {
          values,
          errors: { startedAt: { type: "validate", message: "Informe uma data de inicio válida" } },
        };
      }

      if (values.endedAt === "") {
        return {
          values,
          errors: { endedAt: { type: "required", message: "Informe a data de fim da avaliação" } },
        };
      }

      if (dayjs(values.endedAt).isBefore(dayjs().subtract(1, "day"))) {
        return {
          values,
          errors: { endedAt: { type: "validate", message: "Informe uma data de fim válida" } },
        };
      }

      return { values, errors: {} };
    },
  });

  const { mutate: copyGroup, isLoading: isLoadingCopyExam } = useMutation((data: CopyExamParams) => {
    return apiClient.put("/question-group", data, { headers: { Authorization: `Bearer ${user}` } });
  });

  const { mutate: createExam, isLoading: isLoadingCreateExam } = useMutation(
    (values: Exam) => {
      return apiClient.post(
        "/exam",
        {
          ...values,
          startedAt: dayjs(values.startedAt).toISOString(),
          endedAt: dayjs(values.endedAt).toISOString(),
        },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      async onSuccess(newExam: ApiEntityWrapper<Exam>) {
        if (examToBeCopiedId && !isEdit) {
          const examToBeCopied = exams?.data.data.find(exam => exam.id === examToBeCopiedId);

          if (examToBeCopied) {
            const copyExamPromises = examToBeCopied.groups.map(function (group) {
              return copyGroup({ groupId: group.id, examId: newExam.data.data.id });
            });

            try {
              await Promise.all(copyExamPromises).then(() => {
                setExam(newExam.data.data);
                push(`/exams/${newExam.data.data.id}/groups/`);
              });

              setExam(newExam.data.data);
              push(`/exams/${newExam.data.data.id}/groups/`);
            } catch (error) {
              setExam(newExam.data.data);
              push(`/exams/${newExam.data.data.id}/groups/`);
            }

            return;
          }
        }
        setExam(newExam.data.data);
        showNotification({ message: "Exame criado com sucesso", type: "success" });
        push(`/exams/${newExam.data.data.id}/question-group`);
      },
      onError() {
        showNotification({ message: "Ocorreu algum erro ao tentar criar um exame", type: "error" });
      },
    },
  );

  const { mutate: editExam, isLoading: isLoadingEditExam } = useMutation(
    (values: Exam) => {
      return apiClient.put(
        `/exam/${exam?.data.data.id}`,
        {
          ...values,
          startedAt: dayjs(values.startedAt).toISOString(),
          endedAt: dayjs(values.endedAt).toISOString(),
        },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess(newExam: ApiEntityWrapper<Exam>) {
        setExam(newExam.data.data);
        showNotification({ message: "Exame editado com sucesso", type: "success" });
        push(`/exams/${newExam.data.data.id}/groups`);
      },
      onError() {
        showNotification({ message: "Ocorreu algum erro ao tentar editar um exame", type: "error" });
      },
    },
  );

  const isEdit = exam && exam.data && exam.data.data;

  function submit(values: any) {
    console.log(values);
    isEdit
      ? editExam({
          ...values,
          startedAt: dayjs(values.startedAt).toISOString(),
          endedAt: dayjs(values.endedAt).toISOString(),
        })
      : createExam({
          ...values,
          startedAt: dayjs(values.startedAt).toISOString(),
          endedAt: dayjs(values.endedAt).toISOString(),
        });
  }

  if (isLoadingExam || isLoadingExams || isLoadingExamTarget) {
    return <PageLoad />;
  }

  return (
    <>
      <PagesTitle>{isEdit ? "Editar avaliação" : "Criar avaliação"}</PagesTitle>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container>
          <Grid container item spacing={3} direction="column" md={6}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Informe o titulo da avaliação",
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <StyledTextField
                      label="Titulo"
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
                name="description"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <StyledTextField
                      label="Descrição"
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
                name="startedAt"
                control={control}
                rules={{
                  required: "Informe a data de inicio da avaliação",
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <StyledTextField
                      type="date"
                      label="Data de início"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      helperText={error?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="endedAt"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <StyledTextField
                      type="date"
                      label="Data final da avaliação"
                      value={value}
                      onChange={onChange}
                      error={Boolean(error)}
                      helperText={error?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="allowAnonymous"
                control={control}
                render={props => {
                  return (
                    <FormControlLabel
                      {...props}
                      checked={props.field.value}
                      control={<Checkbox color="primary" />}
                      onChange={props.field.onChange}
                      label="Permitir respostas anónimas"
                    />
                  );
                }}
              />
            </Grid>
            {!isEdit && (
              <Grid item xs={12}>
                <FullWidthFormControl>
                  <InputLabel id="role-input">Copiar questões de avaliação já existente</InputLabel>
                  <Select
                    labelId="role-input"
                    id="role-input"
                    label="Função"
                    onChange={e => {
                      setExamToBeCopiedId(e.target.value as number | "");
                    }}
                    value={examToBeCopiedId}
                  >
                    <MenuItem value="">Selecione um valor</MenuItem>
                    {exams?.data.data.map(({ id, title }) => (
                      <MenuItem key={id} value={id}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FullWidthFormControl>
              </Grid>
            )}
            <Grid item alignContent="flex-end" xs={12}>
              <Button variant="contained" color="primary" size="large" type="submit">
                {isLoadingCreateExam || isLoadingEditExam || isLoadingCopyExam ? (
                  <CircularProgress color="secondary" size={26} />
                ) : isEdit ? (
                  "Editar"
                ) : (
                  "Criar"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
