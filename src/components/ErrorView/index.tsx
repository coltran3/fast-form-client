import { FormHelperText as MuiFormHelperText, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import styled from "styled-components";

const FormHelperText = styled(MuiFormHelperText)`
  display: flex;
  flex-direction: column;
  font-size: 4rem;
  padding: 1.5rem 0;
  align-items: center;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  margin-bottom: 0.5rem;
`;

interface Props {
  children: string;
}

export function ErrorView({ children }: Props) {
  return (
    <FormHelperText error variant="outlined">
      <StyledErrorIcon fontSize="inherit" />
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    </FormHelperText>
  );
}
