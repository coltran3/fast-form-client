import { useState } from "react";
import { Container, Content, TitleAndDate, NewReleasesIcon, CheckCircleIcon } from "./styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, ListItemIcon, MenuItem, Tooltip, Typography } from "@material-ui/core";
import { CardActions, Menu } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import dayjs from "dayjs";

interface Icard {
  title: string;
  date?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onEdit?: () => void;
  done?: boolean;
  // status: "aberto" | "fechado" | "recente" | "novo";
}

export default function Card({ title, date, onEdit, onDelete, onClick, done, onExport }: Icard) {
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
        {done ? <CheckCircleIcon /> : <NewReleasesIcon onClick={onClick} />}
        <Tooltip title={title} aria-label="add">
          <TitleAndDate onClick={onClick}>
            <strong>{title.length > 10 ? title.substring(0, 10) + "..." : title}</strong>
            {formatedDate && <span>{formatedDate}</span>}
          </TitleAndDate>
        </Tooltip>
      </Content>
      {onDelete && onEdit && (
        <>
          <CardActions>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              {!!onExport && (
                <MenuItem
                  onClick={() => {
                    onExport();
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <GetAppIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Exportar</Typography>
                </MenuItem>
              )}
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
        </>
      )}
    </Container>
  );
}
