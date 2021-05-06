import { TextField as MuiTextField, Box, Button as MuiButton, Link as MuiLink } from "@material-ui/core";
import styled from "styled-components";
import { useAuthContext } from "../../stores";

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
  const { setUser } = useAuthContext();

  return (
    <StyledBox>
      <TitleBox>
        <h3>Fast Form</h3>
        <span>Uma nova forma de avaliação</span>
      </TitleBox>
      <FieldBoxes>
        <TextField label="Matricula" variant="outlined" />
        <TextField label="Senha" variant="outlined" type="password" />
        <Button variant="contained" color="primary" size="large" onClick={() => setUser("oi")}>
          Entrar
        </Button>
        <Link>Recuperar senha</Link>
      </FieldBoxes>
    </StyledBox>
  );
}
