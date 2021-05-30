import { Grid } from "@material-ui/core";
import { ReactNode } from "react";
import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ContentContainerProps {
  children: ReactNode[];
}

interface ContentCardProps {
  children: ReactNode;
}

export function ContentContainer(props: ContentContainerProps) {
  return <Grid container spacing={4} {...props} />;
}

export function ContentCard(props: ContentCardProps) {
  return <Grid item xs={3} {...props} />;
}
