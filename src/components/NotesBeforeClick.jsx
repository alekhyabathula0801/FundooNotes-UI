import React from "react";
import { IconButton, Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";

const useStyles = makeStyles(() => ({
  notesBeforeClick: {
    display: "inline-flex",
    width: "50%",
    background: "white",
    padding: "0.3rem 0.5rem",
    margin: "1.6rem 0",
    boxShadow: "1px 1px 4px grey",
  },
}));

function NotesBeforeClick(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.notesBeforeClick}>
      <InputBase
        placeholder=" Take a note..."
        fullWidth
        onClick={() => props.setShowMiniCreateNote(!props.showMiniCreateNote)}
      />
      <IconButton>
        <CheckBoxOutlinedIcon />
      </IconButton>
      <IconButton>
        <BrushOutlinedIcon />
      </IconButton>
      <IconButton>
        <CropOriginalOutlinedIcon />
      </IconButton>
    </Paper>
  );
}

export default NotesBeforeClick;
