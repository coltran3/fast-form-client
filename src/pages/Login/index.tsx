import {
  TextField as MuiTextField,
  Box,
  Button as MuiButton,
  Link as MuiLink,
  CircularProgress,
  FormHelperText,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useAuthContext } from "../../stores";
import { LoginParams } from "../../stores/useAuth";
import { useState } from "react";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
  height: 100%;
  max-width: 38.4375rem;
  padding-top: 11rem;
`;

const TitleBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #47525e;

  h3 {
    margin-bottom: 0.875rem;
    font-size: 28px;
    letter-spacing: 2px;
    line-height: 36px;
  }

  span {
    font-size: 16px;
    line-height: 20px;
  }
`;

const FieldBoxes = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 3.8125rem;

  @media screen and (max-width: 600px) {
    margin-top: 1.9rem;
  }
`;

const TextField = styled(MuiTextField)`
  margin: 0.5rem 0 !important;
`;

const Button = styled(MuiButton)`
  margin: 1.5625rem 0 !important;
`;

const Link = styled(MuiLink)`
  align-self: center;
`;

export function Login(): JSX.Element {
  const { login } = useAuthContext();
  const { handleSubmit, control } = useForm<LoginParams>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  async function handleLogin(params: LoginParams) {
    try {
      setError("");
      setLoading(true);
      await login(params);
    } catch (error) {
      setError("Houve um erro ao tentar fazer login");
    }

    setLoading(false);
  }

  return (
    <StyledBox>
      <TitleBox>
        <h3>Fast Form</h3>
        <span>Uma nova forma de avaliação</span>
      </TitleBox>
      <form onSubmit={handleSubmit(handleLogin)}>
        <FieldBoxes>
          <Controller
            name="login"
            control={control}
            rules={{ required: "Informe a matrícula" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
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
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Informe a senha",
              minLength: { value: 6, message: "Informe uma senha maior que 6 caracteres" },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
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
          <Button variant="contained" color="primary" size="large" type="submit">
            {loading ? <CircularProgress color="secondary" size={26} /> : "Entrar"}
          </Button>
          {error && (
            <FormHelperText error variant="outlined">
              {error}
            </FormHelperText>
          )}
          <Link>Recuperar senha</Link>
        </FieldBoxes>
      </form>
    </StyledBox>
  );
}
