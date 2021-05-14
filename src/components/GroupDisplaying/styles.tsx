import styled from "styled-components";
import { Typography, IconButton } from "@material-ui/core";

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const StyledTypography = styled(Typography)`
  color: ${props => props.theme.grey["3"]};
  margin: 0;
`;

export const StyledIconButton = styled(IconButton)`
  color: ${props => props.theme.grey["3"]};
`;
