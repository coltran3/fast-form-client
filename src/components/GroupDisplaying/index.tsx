import { useState } from "react";
import { IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Header, StyledTypography, StyledIconButton } from "./styles";

interface Props {
  title: string;
  children: JSX.Element;
}

export function GroupDisplaying({ title, children }: Props) {
  const [display, setDisplay] = useState(false);

  const toogleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      <Header>
        <StyledTypography variant="h5" gutterBottom>
          {title}
        </StyledTypography>
        <StyledIconButton onClick={toogleDisplay}>
          {display ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </StyledIconButton>
      </Header>
      {display && children}
    </>
  );
}
