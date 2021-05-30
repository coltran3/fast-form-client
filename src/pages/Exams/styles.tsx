import { Grid } from "@material-ui/core";
import { ReactNode } from "react";
import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ContentCardProps {
  children: ReactNode[];
}

export function ContentCard({ children }: ContentCardProps) {
  return (
    <Grid container spacing={4}>
      {children.map(c => (
        <Grid item xs={3}>
          {c}
        </Grid>
      ))}
    </Grid>
  );
}
