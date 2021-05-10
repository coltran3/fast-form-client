import React, { useState } from "react";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import IconButton from "@material-ui/core/IconButton";
import { Container, Header } from "./styles";

interface Props {
  title: string;
  children: JSX.Element;
  onChanged?: (value: boolean) => void;
}

export default function GroupDisplaying({ title, onChanged, children }: Props) {
  const [display, setDisplay] = useState(false);

  const toogleDisplay = () => {
    setDisplay(!display);
    onChanged && onChanged(display);
  };
  return (
    <Container>
      <Header>
        <h2>{title}</h2>
        <IconButton onClick={() => toogleDisplay()}>{display ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</IconButton>
      </Header>
      {display && children}
    </Container>
  );
}
