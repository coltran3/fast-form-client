import { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Header, StyledTypography, StyledIconButton } from "./styles";

interface Props {
  title: string;
  children: JSX.Element;
  defaultDisplay?: boolean;
}

export function GroupDisplaying({ title, children, defaultDisplay }: Props) {
  const [display, setDisplay] = useState(defaultDisplay);

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
