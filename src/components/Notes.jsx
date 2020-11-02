import React, { useState, useEffect, useContext } from "react";
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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import CalculateTime from "../util/CalculateTime";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import MessageContext from "../components/MessageContext";

function Note(props) {
  const message = useContext(MessageContext);
  const [isArchived, setIsArchived] = useState(props.data.isArchived);
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [color, setColor] = useState(props.data.color);
  const [isPined, setIsPined] = useState(props.data.isPined);
  const [reminder, setReminder] = useState(props.data.reminder);
  const [noteId, setNoteId] = useState(props.data.id);
  const [displayListIcons, setDisplayListIcons] = useState(false);
  const [showListView, setShowListView] = useState(props.showListView);
  const [showReminderClearIcon, setShowReminderClearIcon] = useState(false);

  let dateSection = "";
  let timeSection = "";
  let timeGotOver = "";
  let reminderTime = "";

  if (reminder.length > 0) {
    const [date, time, over] = CalculateTime(reminder[0]);
    dateSection = date;
    timeSection = time;
    timeGotOver = over;
    reminderTime = date + ", " + time;
  }

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

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
        if (data.isArchived) message.setMessage("Note archived Sucessfully");
        else message.setMessage("Note unArchived Sucessfully");
        message.setSnackBar(true);
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

  let deleteNoteForever = () => {
    const data = {
      noteIdList: [noteId],
    };
    NoteServices.deleteNoteForever(data)
      .then((response) => {
        console.log("delete note forever response " + response.data);
        props.getAllNotes();
      })
      .catch((error) => console.log(error));
  };

  let toogleDeleteNote = (isDelete) => {
    const data = {
      isDeleted: isDelete,
      noteIdList: [noteId],
    };
    NoteServices.restoreNote(data)
      .then((response) => {
        props.getAllNotes();
      })
      .catch((error) => console.log(error));
  };

  let removeReminder = () => {
    const data = {
      noteIdList: [noteId],
    };
    NoteServices.removeReminder(data)
      .then((response) => {
        console.log("remove reminder note response " + response.data);
        props.getAllNotes();
      })
      .catch((error) => console.log(error));
  };

  let addOrUpdateReminder = (date) => {
    const data = {
      reminder: date,
      noteIdList: [noteId],
    };
    NoteServices.addOrUpdateReminder(data)
      .then(() => {
        props.getAllNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const useStyles = makeStyles((theme) => ({
    note: {
      display: "inline-flex",
      width:
        !showListView && !props.isPopUp
          ? "50%"
          : props.isPopUp
          ? "30rem"
          : "14rem",
      background: color,
      padding: "0.3rem 0.5rem",
      margin: props.isPopUp ? "0" : "0.8rem",
      boxShadow:
        props.isPopUp || !displayListIcons ? "none" : "1px 1px 4px grey",
      flexDirection: "column",
      border: "1px solid #e0e0e0",
      borderRadius: "0.5rem",
      [theme.breakpoints.down(960)]: {
        width:
          !showListView && !props.isPopUp
            ? "70%"
            : props.isPopUp
            ? "30rem"
            : "14rem",
      },
      [theme.breakpoints.down(600)]: {
        padding: "0.3rem",
        width:
          !showListView && !props.isPopUp
            ? "85%"
            : props.isPopUp
            ? "400px"
            : "14rem",
      },
      [theme.breakpoints.down(500)]: {
        width: props.isPopUp ? "90%" : "20rem",
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
      paddingRight: "0.1rem",
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
      opacity: props.isPopUp ? "0.71" : displayListIcons ? "0.71" : "0",
    },
    notePin: {
      color: "rgb(0,0,0)",
      opacity: props.isPopUp ? "0.71" : displayListIcons ? "0.71" : "0",
    },
    notesListIconButtons: {
      padding: "0.35rem",
    },
    notesTitleInput: {
      fontWeight: "500",
      opacity: "0.88",
    },
    noteListLeftIcons: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    notesRemainderLabel: {
      display: "flex",
      alignItems: "center",
      backgroundColor: timeGotOver ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.2)",
      borderRadius: "1.5rem",
      padding: "0.2rem 0 0.2rem 0.2rem",
      textDecoration: timeGotOver ? "line-through" : null,
      maxWidth: "13rem",
    },
    notesRemainderLabelClockIcon: {
      fontSize: "1.2rem",
    },
    notesRemainderLabelClearButton: {
      padding: "0.2rem",
    },
    notesRemainderLabelClearIcon: {
      padding: "0",
      fontSize: "1rem",
      display: showReminderClearIcon ? "block" : "none",
    },
    notesRemainderLabelDateTime: {
      textAlign: "left",
      verticalAlign: "middle",
      width: "10rem",
    },
  }));

  const classes = useStyles();

  const notesIconList = (
    <>
      <RemindMe
        buttonClassName={classes.notesListIconButtons}
        iconClassName={classes.noteListIcons}
        setReminder={addOrUpdateReminder}
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
        deleteNote={toogleDeleteNote}
      />
    </>
  );

  const notesBinIcons = (
    <>
      <Tooltip title="Delete forever" placement="bottom">
        <IconButton
          className={classes.notesListIconButtons}
          onClick={() => deleteNoteForever()}
        >
          <DeleteForeverIcon className={classes.noteListIcons} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Restore" placement="bottom">
        <IconButton
          className={classes.notesListIconButtons}
          onClick={() => toogleDeleteNote(false)}
        >
          <RestoreFromTrashIcon className={classes.noteListIcons} />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Paper
      className={classes.note}
      onMouseOver={() => setDisplayListIcons(true)}
      onMouseLeave={() => setDisplayListIcons(false)}
    >
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
        {!props.isBin ? (
          <PinNote
            isPined={isPined}
            tooglePinNote={tooglePinNote}
            pinClassName={classes.notePin}
          />
        ) : null}
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
      {reminder.length > 0 ? (
        <div
          className={classes.notesRemainderLabel}
          onMouseOver={() => {
            setShowReminderClearIcon(true);
          }}
          onMouseLeave={() => {
            setShowReminderClearIcon(false);
          }}
        >
          <AccessTimeOutlinedIcon
            className={classes.notesRemainderLabelClockIcon}
          />
          <span className={classes.notesRemainderLabelDateTime}>
            {reminderTime}
          </span>
          <IconButton
            className={classes.notesRemainderLabelClearButton}
            onClick={() => removeReminder()}
          >
            <ClearOutlinedIcon
              className={classes.notesRemainderLabelClearIcon}
            />
          </IconButton>
        </div>
      ) : null}
      <div className={classes.noteList}>
        <div
          className={
            !props.isBin && !props.isPopUp ? classes.noteListLeftIcons : null
          }
        >
          {props.isBin ? notesBinIcons : notesIconList}
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
