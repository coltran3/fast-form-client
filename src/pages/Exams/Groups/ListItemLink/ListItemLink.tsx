import { ListItem } from "@material-ui/core";
import { ReactNode } from "react";

export interface ListItemLinkProps {
  onClick: () => void;
  children: ReactNode;
}

export function ListItemLink(props: ListItemLinkProps) {
  return <ListItem button component="a" {...props} />;
}
