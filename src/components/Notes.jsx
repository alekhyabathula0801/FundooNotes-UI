import React, { useState, useEffect } from "react";
import { Paper, InputBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoteServices from "../services/NoteServices";
import ColorPalletIcon from "./ColorPalletIcon";
import AddPersonIcon from "./AddPersonIcon";
import RemindMe from "./RemindMe";
import AddImageIcon from "./AddImageIcon";
import MoreIcon from "./MoreIcon";
import PinNote from "./PinNoteIcon";
import ArchiveNote from "./ArchiveNoteIcon";

function Note(props) {
  const [isArchived, setIsArchived] = useState(props.data.isArchived);
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [color, setColor] = useState(props.data.color);
  const [isPined, setIsPined] = useState(props.data.isPined);
  const [noteId, setNoteId] = useState(props.data.id);
  const [noteData, setNoteData] = useState(props.data);

  useEffect(() => {
    setIsArchived(props.data.isArchived);
  }, [props.data.isArchived]);

  useEffect(() => {
    setTitle(props.data.title);
  }, [props.data.title]);

  useEffect(() => {
    setDescription(props.data.description);
  }, [props.data.description]);

  useEffect(() => {
    setColor(props.data.color);
  }, [props.data.color]);

  useEffect(() => {
    setIsPined(props.data.isPined);
  }, [props.data.isPined]);

  useEffect(() => {
    setNoteId(props.data.id);
  }, [props.data.id]);

  useEffect(() => {
    setNoteData(props.data);
  }, [props.data]);

  let tooglePinNote = () => {
    let data = {};
    data = {
      isPined: !isPined,
      noteIdList: [noteId],
    };
    NoteServices.tooglePinNote(data)
      .then((response) => {
        console.log(response.data);
        props.getAllNotes();
      })
      .catch((error) => console.log(error));
  };

  let toogleArchiveNote = () => {
    let data = {};
    data = {
      isArchived: !isArchived,
      noteIdList: [noteId],
    };
    NoteServices.toogleArchiveNote(data)
      .then((response) => {
        console.log("Archive response data " + response.data);
        props.getAllNotes();
      })
      .catch((error) => console.log(error));
  };

  let setNoteColor = (color) => {
    const data = {
      color: color,
      noteIdList: [noteId],
    };
    NoteServices.updateNoteColor(data)
      .then((response) => {
        console.log("update color response " + response.data);
        setColor(color);
      })
      .catch((error) => console.log(error));
  };

  const useStyles = makeStyles((theme) => ({
    note: {
      display: "inline-flex",
      width: !props.isPopUp ? "14rem" : "30rem",
      background: color,
      padding: "0.3rem 0.5rem",
      margin: "0.8rem",
      boxShadow: props.isPopUp ? "none" : "1px 1px 4px grey",
      flexDirection: "column",
      [theme.breakpoints.down(600)]: {
        padding: "0.3rem",
        width: !props.isPopUp ? "14rem" : "400px",
      },
      [theme.breakpoints.down(500)]: {
        width: !props.isPopUp ? "20rem" : "90%",
      },
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
      [theme.breakpoints.down(350)]: {
        flexDirection: "column",
      },
    },
    noteCloseButton: {
      padding: "0.2rem 0.8rem",
      fontSize: "0.5rem",
      color: "rgba(0,0,0,0.8)",
      textTransform: "capitalize",
      display: props.showCloseButton ? "block" : "none",
      [theme.breakpoints.down(480)]: {
        padding: "0.2rem",
      },
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
    <Paper className={classes.note}>
      <div className={classes.noteTitle}>
        <InputBase
          className={classes.notesTitleInput}
          placeholder="Title"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          onClick={
            !props.isPopUp
              ? () => {
                  props.getNotesData(props.data);
                  props.handleClickOpen();
                }
              : null
          }
        />
        <PinNote
          isPined={isPined}
          tooglePinNote={tooglePinNote}
          pinClassName={classes.notePin}
        />
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
        onClick={
          !props.isPopUp
            ? () => {
                props.getNotesData(props.data);
                props.handleClickOpen();
              }
            : null
        }
      />
      <div className={classes.noteList}>
        <div>
          <RemindMe
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
          />
          <AddPersonIcon
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
          />
          <ColorPalletIcon
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
            setColor={setNoteColor}
          />
          <AddImageIcon
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
          />
          <ArchiveNote
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
            toogleArchiveNote={toogleArchiveNote}
          />
          <MoreIcon
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
          />
        </div>
        <Button
          className={classes.noteCloseButton}
          onClick={() => {
            let data = {};
            data = {
              title: title,
              description: description,
              noteId: noteId,
            };
            if (title !== "" && description !== "") {
              NoteServices.updateNote(data)
                .then((response) => {
                  console.log(response.data);
                  props.getAllNotes();
                })
                .catch((error) => console.log(error));
            }
            props.closePopUp();
          }}
        >
          Close
        </Button>
      </div>
    </Paper>
  );
}

export default Note;
