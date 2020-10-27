import React, { useState } from "react";
import { IconButton, Paper, InputBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import FundooNoteServices from "../services/FundooNoteServices";

function Note(props) {
  const [isArchived, setIsArchived] = useState(props.data.isArchived);
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [color] = useState(props.data.color);
  const [isPined, setIsPined] = useState(props.data.isPined);
  const useStyles = makeStyles(() => ({
    note: {
      display: "inline-flex",
      width: !props.isPopUp ? "240px" : "30rem",
      background: "white",
      padding: "0.3rem 0.5rem",
      margin: "0.8rem",
      boxShadow: props.isPopUp ? "none" : "1px 1px 4px grey",
      flexDirection: "column",
    },
    noteTitle: {
      padding: "0.1rem 0.3rem",
      display: "flex",
      justifyContent: "space-between",
    },
    noteDescription: {
      padding: "0.5rem 0.3rem 0.8rem 0.3rem",
    },
    noteList: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "0.5rem",
    },
    noteCloseButton: {
      padding: "0.2rem 0.8rem",
      fontSize: "0.5rem",
      color: "rgba(0,0,0,0.8)",
      textTransform: "capitalize",
      display: props.showCloseButton ? "block" : "none",
    },
    noteListIcons: {
      width: "1.2rem",
      height: "1.2rem",
      color: "#202124",
      opacity: "0.71",
    },
    notePin: {
      color: "rgba(0,0,0,0.73)",
    },
    notesListIconButtons: {
      padding: "0.35rem",
    },
    notesTitleInput: {
      fontWeight: "500",
      opacity: "0.88",
    },
  }));

  const classes = useStyles();
  return (
    <Paper
      className={classes.note}
      onClick={
        !props.isPopUp
          ? () => {
              props.getNotesData(props.data);
              props.handleClickOpen();
            }
          : null
      }
    >
      <div className={classes.noteTitle}>
        <InputBase
          className={classes.notesTitleInput}
          placeholder=" Title"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <IconButton onClick={() => setIsPined(!isPined)}>
          {!isPined ? (
            <BookmarkBorderOutlinedIcon className={classes.notePin} />
          ) : (
            <BookmarkOutlinedIcon></BookmarkOutlinedIcon>
          )}
        </IconButton>
      </div>
      <InputBase
        multiline={true}
        rowsMax={20}
        placeholder=" Take a note..."
        fullWidth
        value={description}
        className={classes.noteDescription}
        onChange={(e) => {
          setDescription(e.currentTarget.value);
        }}
      />
      <div className={classes.noteList}>
        <div>
          <IconButton className={classes.notesListIconButtons}>
            <AddAlertOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton className={classes.notesListIconButtons}>
            <PersonAddOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton className={classes.notesListIconButtons}>
            <PaletteOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton className={classes.notesListIconButtons}>
            <CropOriginalOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton
            className={classes.notesListIconButtons}
            onClick={() => {
              setIsArchived(!isArchived);
            }}
          >
            <ArchiveOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton className={classes.notesListIconButtons}>
            <MoreVertOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
        </div>
        <Button
          className={classes.noteCloseButton}
          onClick={() => {
            let data = {};
            data = {
              title,
              description,
            };
            console.log(data);
          }}
        >
          Close
        </Button>
      </div>
    </Paper>
  );
}

export default Note;
