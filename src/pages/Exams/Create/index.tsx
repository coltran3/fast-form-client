import { PagesTitle } from "../../../components/PagesTitle";
import { Grid, TextField, Button, CircularProgress, FormControlLabel, Checkbox } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { useMutation } from "react-query";
import { apiClient } from "../../../api";
import { Exam } from "../types";
import { useAuthContext, useNotificationContext } from "../../../stores";
import { useHistory } from "react-router";

const StyledTextField = styled(TextField)`
  width: 100%;
`;

export function Create() {
  const { user } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const { push } = useHistory();
  const { handleSubmit, control } = useForm({
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

  const { mutate: createExam, isLoading } = useMutation(
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
      onSuccess() {
        showNotification({ message: "Usuário cadastrado com sucesso", type: "success" });
        push("./");
      },
      onError() {
        showNotification({ message: "Ocorreu algum erro ao tentar cadastrar o usuário", type: "error" });
      },
    },
  );

  function submit(values: any) {
    createExam({
      ...values,
      startedAt: dayjs(values.startedAt).toISOString(),
      endedAt: dayjs(values.endedAt).toISOString(),
    });
  }

  return (
    <>
      <PagesTitle>Criar avaliação</PagesTitle>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3} direction="column" md={6}>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Informe o titulo da avaliação",
                validate({ title }) {
                  console.log(title);
                  return undefined;
                },
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
            {isLoading ? <CircularProgress color="secondary" size={26} /> : "Criar"}
          </Button>
        </Grid>
      </form>
    </>
  );
}
