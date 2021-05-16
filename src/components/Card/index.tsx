import { useState } from "react";
import { Container, Content, TitleAndDate, NewReleasesIcon } from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import { CardActions, Menu } from "@material-ui/core";
import dayjs from "dayjs";

interface Icard {
  title: string;
  date?: string;
  onDelete: () => void;
  onEdit: () => void;
  // status: "aberto" | "fechado" | "recente" | "novo";
}

export default function Card({ title, date, onEdit, onDelete }: Icard) {
  const formatedDate = Boolean(date) ? dayjs(date).format("DD/MM/YYYY") : undefined;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Content>
        <NewReleasesIcon />
        <TitleAndDate>
          <strong>{title}</strong>
          {formatedDate && <span>{formatedDate}</span>}
        </TitleAndDate>
      </Content>
      <CardActions>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              onEdit();
              handleClose();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Editar</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete();
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Remover</Typography>
          </MenuItem>
        </Menu>
      </CardActions>
    </Container>
  );
}
