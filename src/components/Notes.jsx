import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  InputBase,
  Button,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
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
  const [noteLabels, setNoteLabels] = useState(
    props.data.noteLabels.filter((label) => !label.isDeleted)
  );
  const [noteCollaborators, setNoteCollaborators] = useState(
    props.data.collaborators
  );

  let dateSection = "";
  let timeSection = "";
  let timeGotOver = "";
  let reminderTime = "";

  if (reminder.length > 0) {
    const [date, time, over] = CalculateTime(reminder[0], false);
    dateSection = date;
    timeSection = time;
    timeGotOver = over;
    reminderTime = date + ", " + time;
  }

  useEffect(() => {
    props.data.noteLabels
      .filter((label) => label.isDeleted)
      .forEach((element) => {
        removeLabelFromNote(element.id);
      });
  }, [props.data.noteLabels]);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  useEffect(() => {
    setIsArchived(props.data.isArchived);
    setTitle(props.data.title);
    setDescription(props.data.description);
    setColor(props.data.color);
    setIsPined(props.data.isPined);
    setNoteId(props.data.id);
    setReminder(props.data.reminder);
    setNoteLabels(props.data.noteLabels.filter((label) => !label.isDeleted));
  }, [props.data]);

  let tooglePinNote = () => {
    let data = {};
    data = {
      isPined: !isPined,
      noteIdList: [noteId],
    };
    NoteServices.tooglePinNote(data)
      .then(() => {
        if (data.isPined) message.setMessage("Note pinned Sucessfully");
        else message.setMessage("Note unpinned Sucessfully");
        message.setSnackBar(true);
        props.getAllNotes();
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let toogleArchiveNote = () => {
    let data = {};
    data = {
      isArchived: !isArchived,
      noteIdList: [noteId],
    };
    NoteServices.toogleArchiveNote(data)
      .then(() => {
        if (data.isArchived) message.setMessage("Note archived Sucessfully");
        else message.setMessage("Note unArchived Sucessfully");
        message.setSnackBar(true);
        props.getAllNotes();
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let setNoteColor = (color) => {
    const data = {
      color: color,
      noteIdList: [noteId],
    };
    NoteServices.updateNoteColor(data)
      .then(() => {
        message.setMessage("Note color updated Sucessfully");
        message.setSnackBar(true);
        setColor(color);
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let deleteNoteForever = () => {
    const data = {
      noteIdList: [noteId],
    };
    NoteServices.deleteNoteForever(data)
      .then(() => {
        message.setMessage("Note deleted forever Sucessfully");
        message.setSnackBar(true);
        props.getAllNotes();
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let toogleDeleteNote = (isDelete) => {
    const data = {
      isDeleted: isDelete,
      noteIdList: [noteId],
    };
    NoteServices.restoreNote(data)
      .then(() => {
        if (data.isDeleted) message.setMessage("Note deleted Sucessfully");
        else message.setMessage("Note restored Sucessfully");
        message.setSnackBar(true);
        props.getAllNotes();
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let removeReminder = () => {
    const data = {
      noteIdList: [noteId],
    };
    NoteServices.removeReminder(data)
      .then(() => {
        message.setMessage("Note reminder deleted Sucessfully");
        message.setSnackBar(true);
        props.getAllNotes();
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let removeLabelFromNote = (labelId) => {
    NoteServices.removeLabelFromNote(labelId, noteId)
      .then(() => {
        setNoteLabels(noteLabels.filter((label) => label.id !== labelId));
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let addLabelFromNote = (labelId) => {
    NoteServices.addLabelFromNote(labelId, noteId)
      .then(() => {
        message.setMessage("Note label added Sucessfully");
        message.setSnackBar(true);
        setNoteLabels([
          ...noteLabels,
          props.labelDetails.find((label) => label.id === labelId),
        ]);
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let addOrUpdateReminder = (date) => {
    const data = {
      reminder: date,
      noteIdList: [noteId],
    };
    NoteServices.addOrUpdateReminder(data)
      .then(() => {
        message.setMessage("Note reminder updated Sucessfully");
        message.setSnackBar(true);
        props.getAllNotes();
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let updateNote = () => {
    let data = {
      title: title,
      description: description,
      noteId: noteId,
    };
    if (title !== "" && description !== "") {
      NoteServices.updateNote(data)
        .then(() => {
          message.setMessage("Note updated Sucessfully");
          message.setSnackBar(true);
          props.getAllNotes();
        })
        .catch(() => {
          message.setMessage("Some Error Occured while processing request");
          message.setSnackBar(true);
        });
    }
  };

  let addCollaborator = (user) => {
    NoteServices.addCollaborator(user, noteId)
      .then(() => {
        message.setMessage("Note Collaborator added Sucessfully");
        message.setSnackBar(true);
        setNoteCollaborators([...noteCollaborators, user]);
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      });
  };

  let removeCollaborator = (userId) => {
    NoteServices.removeCollaborator(userId, noteId)
      .then(() => {
        message.setMessage("Note Collaborator removed Sucessfully");
        message.setSnackBar(true);
        setNoteCollaborators(
          noteCollaborators.filter((user) => user.userId !== userId)
        );
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
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
      backgroundColor: timeGotOver ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.09)",
      borderRadius: "1.5rem",
      padding: "0.2rem 0 0.2rem 0.5rem",
      textDecoration: timeGotOver ? "line-through" : null,
      maxInlineSize: "fit-content",
      "&:hover $notesRemainderLabelClearIcon": {
        opacity: "1",
      },
    },
    notesRemainderLabelClockIcon: {
      fontSize: "1.2rem",
    },
    notesRemainderLabelClearButton: {
      padding: "0.08rem",
    },
    notesRemainderLabelClearIcon: {
      padding: "0",
      fontSize: "1rem",
      opacity: "0",
    },
    notesRemainderLabelDateTime: {
      textAlign: "left",
    },
    notesLabels: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      padding: "0.2rem",
    },
    notesLabelElement: {
      padding: "0.2rem 0 0.2rem 0.75rem",
      borderRadius: "1.5rem",
      backgroundColor: "rgba(0,0,0,0.09)",
      margin: "0.2rem",
      "&:hover $notesLabelClearIcon": {
        opacity: "1",
      },
    },
    notesLabelClearIcon: {
      padding: "0",
      fontSize: "0.9rem",
      opacity: "0",
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
        addCollaborator={addCollaborator}
        noteCollaborators={noteCollaborators}
        removeCollaborator={removeCollaborator}
        getAllNotes={props.getAllNotes}
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
        noteLabels={noteLabels}
        labelDetails={props.labelDetails}
        removeLabelFromNote={removeLabelFromNote}
        addLabelFromNote={addLabelFromNote}
        getAllNotes={props.getAllNotes}
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
      {reminder.length > 0 && !props.isBin ? (
        <span className={classes.notesRemainderLabel}>
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
        </span>
      ) : null}
      <div className={classes.notesLabels}>
        {noteLabels.map((label, index) => {
          return (
            <span key={index} className={classes.notesLabelElement}>
              <span>{label.label}</span>
              {props.isBin ? null : (
                <IconButton
                  className={classes.notesRemainderLabelClearButton}
                  onClick={() => removeLabelFromNote(label.id)}
                >
                  <ClearOutlinedIcon className={classes.notesLabelClearIcon} />
                </IconButton>
              )}
            </span>
          );
        })}
      </div>
      <div className={classes.notesLabels}>
        {noteCollaborators.map((collaborator, index) => {
          return (
            <Tooltip title={collaborator.email} placement="bottom" key={index}>
              <ListItemAvatar>
                <Avatar alt={collaborator.firstName}>
                  {collaborator.firstName[0]}
                </Avatar>
              </ListItemAvatar>
            </Tooltip>
          );
        })}
      </div>
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
            updateNote();
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
