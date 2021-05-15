import styled from "styled-components";
import { Card as MuiCard, CardContent as MuiCardContent } from "@material-ui/core";
import MuiNewReleasesIcon from "@material-ui/icons/NewReleases";

export const Container = styled(MuiCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.grey["3"]} !important;
`;
export const Content = styled(MuiCardContent)`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TitleAndDate = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  strong {
    font-size: 16px;
    margin-bottom: 4px;
  }

  span {
    font-size: 10px;
  }
`;

export const NewReleasesIcon = styled(MuiNewReleasesIcon)`
  cursor: pointer;
`;
