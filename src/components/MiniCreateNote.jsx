import React from "react";
import { IconButton, Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  miniCreateNote: {
    display: "inline-flex",
    width: "50%",
    background: "white",
    padding: "0 0.5rem",
    margin: "1.6rem 0",
    boxShadow: "1px 1px 4px grey",
    [theme.breakpoints.down(960)]: {
      width: "70%",
    },
    [theme.breakpoints.down(540)]: {
      width: "85%",
    },
    [theme.breakpoints.down(360)]: {
      width: "95%",
    },
  },

  miniCreateNoteIconButton: {
    [theme.breakpoints.down(660)]: {
      padding: "0.3rem",
    },
  },
}));

function MiniCreateNote(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.miniCreateNote}>
      <InputBase
        placeholder=" Take a note..."
        fullWidth
        onClick={() => props.setShowMiniCreateNote()}
      />
      <Tooltip title="New list" placement="bottom">
        <IconButton className={classes.miniCreateNoteIconButton}>
          <CheckBoxOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="New note with drawing" placement="bottom">
        <IconButton className={classes.miniCreateNoteIconButton}>
          <BrushOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="New note with image" placement="bottom">
        <IconButton className={classes.miniCreateNoteIconButton}>
          <CropOriginalOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

export default MiniCreateNote;
