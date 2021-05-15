import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
} from "@material-ui/core";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { UserParams, UserType, UserRole } from "../types";
import { useMutation } from "react-query";
import { apiClient } from "../../../api";
import { USER_ROLE_TRANSLATE_OBJ, USER_TYPE_TRANSLATE_OBJ } from "../constants";
import { useNotificationContext } from "../../../stores";
import { useHistory } from "react-router-dom";
import { PagesTitle } from "../../../components/PagesTitle";

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
`;

export function Create() {
  const { handleSubmit, control } = useForm<UserParams>();
  const { push } = useHistory();
  const { showNotification } = useNotificationContext();

  const { mutate: createUser, isLoading } = useMutation(
    (variables: Omit<UserParams, "confirmPassword">) => {
      return apiClient.post("/user", variables);
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

  function submit({ confirmPassword, ...data }: UserParams) {
    createUser(data);
  }

  return (
    <>
      <PagesTitle>Criar usuario</PagesTitle>

      <StyledForm onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3} direction="column" md={6}>
          <Grid item xs={12}>
            <Controller
              name="enrollment"
              control={control}
              rules={{ required: "Informe a matrícula do usuário" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <StyledTextField
                    label="Matricula"
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
              name="cpf"
              control={control}
              rules={{ required: "Informe o CPF do usuário" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <StyledTextField
                    label="CPF"
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
              rules={{ required: "Informe o tipo do usuário" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <StyledFormControl error={Boolean(error)} variant="outlined">
                    <InputLabel id="role-input">Tipo</InputLabel>
                    <Select labelId="role-input" id="role-input" label="Função" onChange={onChange} value={value}>
                      <MenuItem value="">Selecione um valor</MenuItem>
                      {Object.values(UserType).map(userType => (
                        <MenuItem key={userType} value={userType}>
                          {USER_TYPE_TRANSLATE_OBJ[userType]}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                );
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Informe a função do usuário" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <StyledFormControl error={Boolean(error)} variant="outlined">
                    <InputLabel id="role-input">Função</InputLabel>
                    <Select labelId="role-input" id="role-input" label="Função" onChange={onChange} value={value}>
                      <MenuItem value="">Selecione um valor</MenuItem>
                      {Object.values(UserRole).map(UserRole => (
                        <MenuItem key={UserRole} value={UserRole}>
                          {USER_ROLE_TRANSLATE_OBJ[UserRole]}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                );
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Informe a senha do usuário" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <StyledTextField
                    label="Senha"
                    variant="outlined"
                    type="password"
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
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirme a senha",
                validate: ({ password, confirmPassword }) => {
                  if (password !== confirmPassword) {
                    return "As senhas não são iguais";
                  }
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <StyledTextField
                    label="Confirme a senha"
                    variant="outlined"
                    type="password"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                );
              }}
            />
          </Grid>

          <Grid item xs={12} container alignItems="flex-end">
            <StyledButton variant="contained" color="primary" size="large" type="submit">
              {isLoading ? <CircularProgress color="secondary" size={26} /> : "Criar"}
            </StyledButton>
          </Grid>
        </Grid>
      </StyledForm>
    </>
  );
}
