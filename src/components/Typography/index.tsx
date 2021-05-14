import { ReactNode } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

export const StyledTypography = styled(Typography)`
  color: ${props => props.theme.grey["3"]};
`;

export function PagesTitle(props: Props) {
  return <StyledTypography variant="h3" gutterBottom {...props} />;
}
