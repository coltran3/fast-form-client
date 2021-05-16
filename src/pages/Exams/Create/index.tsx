import { PagesTitle } from "../../../components/PagesTitle";
import { Grid, TextField, Button, CircularProgress, FormControlLabel, Checkbox } from "@material-ui/core";
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

const StyledTextField = styled(TextField)`
  width: 100%;
`;

export function Create() {
  const { user } = useAuthContext();
  const { examId } = useParams<ExamRouteParams>();
  const { setExam } = useExamsContext();
  const { showNotification } = useNotificationContext();
  const { push } = useHistory();
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
      onSuccess(newExam: ApiEntityWrapper<Exam>) {
        setExam(newExam.data.data);
        showNotification({ message: "Exame criado com sucesso", type: "success" });
        push(`/exams/${newExam.data.data.id}/group`);
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
        showNotification({ message: "Exame criado com sucesso", type: "success" });
        push(`/exams/${newExam.data.data.id}/group`);
      },
      onError() {
        showNotification({ message: "Ocorreu algum erro ao tentar criar um exame", type: "error" });
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

  if (isLoadingExam) {
    return <PageLoad />;
  }

  return (
    <>
      <PagesTitle>{isEdit ? "Editar avaliação" : "Criar avaliação"}</PagesTitle>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3} direction="column" md={6}>
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
              render={({ field: { onChange, value } }) => {
                return (
                  <FormControlLabel
                    control={<Checkbox value={value} onChange={onChange} color="primary" />}
                    label="Permitir respostas anónimas"
                  />
                );
              }}
            />
          </Grid>
          <Button variant="contained" color="primary" size="large" type="submit">
            {isLoadingCreateExam || isLoadingEditExam ? (
              <CircularProgress color="secondary" size={26} />
            ) : isEdit ? (
              "Editar"
            ) : (
              "Criar"
            )}
          </Button>
        </Grid>
      </form>
    </>
  );
}
