import React from "react";
import { IconButton, Paper, InputBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

const useStyles = makeStyles(() => ({
  createNote: {
    display: "inline-flex",
    width: "50%",
    background: "white",
    padding: "0.3rem 0.5rem",
    margin: "1.6rem 0",
    boxShadow: "1px 1px 4px grey",
    flexDirection: "column",
  },
  createNoteTittle: {
    padding: "0.5rem 0.3rem",
  },
  createNoteDescription: {
    padding: "0.5rem 0.3rem 0.8rem 0.3rem",
  },
  createNoteList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "0.5rem",
  },
  createNoteCloseButton: {
    padding: "0.2rem 0.8rem",
    fontSize: "0.5rem",
    color: "rgba(0,0,0,0.8)",
    textTransform: "capitalize",
  },
  createNoteListIcons: {
    width: "1.2rem",
    height: "1.2rem",
    color: "#202124",
    opacity: "0.71",
  },
}));

function CreateNote(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.createNote}>
      <InputBase
        placeholder=" Title"
        fullWidth
        className={classes.createNoteTittle}
      />
      <InputBase
        multiline={true}
        rowsMax={20}
        placeholder=" Take a note..."
        fullWidth
        className={classes.createNoteDescription}
      />
      <div className={classes.createNoteList}>
        <div>
          <IconButton>
            <AddAlertOutlinedIcon className={classes.createNoteListIcons} />
          </IconButton>
          <IconButton>
            <PersonAddOutlinedIcon className={classes.createNoteListIcons} />
          </IconButton>
          <IconButton>
            <PaletteOutlinedIcon className={classes.createNoteListIcons} />
          </IconButton>
          <IconButton>
            <CropOriginalOutlinedIcon className={classes.createNoteListIcons} />
          </IconButton>
          <IconButton>
            <ArchiveOutlinedIcon className={classes.createNoteListIcons} />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon className={classes.createNoteListIcons} />
          </IconButton>
        </div>
        <Button
          className={classes.createNoteCloseButton}
          onClick={() => props.setShowMiniCreateNote(!props.showMiniCreateNote)}
        >
          Close
        </Button>
      </div>
    </Paper>
  );
}

export default CreateNote;
