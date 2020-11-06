import React, { useState, useContext } from "react";
import {
  Paper,
  InputBase,
  Button,
  IconButton,
  Tooltip,
  Avatar,
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
import MessageContext from "../components/MessageContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import CalculateTime from "../util/CalculateTime";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

function CreateNote(props) {
  const message = useContext(MessageContext);
  const [isArchived, setIsArchived] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [isPined, setIsPined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reminder, setReminder] = useState("");
  const [noteLabels, setNoteLabels] = useState([]);
  const [noteCollaborators, setNoteCollaborators] = useState([]);

  let dateSection = "";
  let timeSection = "";
  let timeGotOver = "";
  let reminderTime = "";

  if (reminder !== "") {
    const [date, time, over] = CalculateTime(reminder, true);
    dateSection = date;
    timeSection = time;
    timeGotOver = over;
    reminderTime = date + ", " + time;
  }

  const useStyles = makeStyles((theme) => ({
    createNote: {
      display: "inline-flex",
      width: "50%",
      background: color,
      padding: "0.3rem 0.5rem",
      margin: "1.6rem 0",
      boxShadow: "1px 1px 4px grey",
      flexDirection: "column",
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
    createNoteTittle: {
      padding: "0.1rem 0.3rem",
      display: "flex",
      justifyContent: "space-between",
    },
    createNoteDescription: {
      padding: "0.5rem 0.3rem 0.8rem 0.3rem",
    },
    createNoteList: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "0.5rem",
      [theme.breakpoints.down(380)]: {
        flexDirection: "column",
      },
    },
    createNoteCloseButton: {
      padding: "0.2rem 0.8rem",
      fontSize: "0.5rem",
      color: "rgba(0,0,0,0.8)",
      textTransform: "capitalize",
      [theme.breakpoints.down(460)]: {
        padding: "0.2rem",
      },
    },
    createNotePin: {
      color: "rgba(0,0,0,0.73)",
    },
    createNoteListIconButton: {
      [theme.breakpoints.down(540)]: {
        padding: "0.3rem",
      },
    },
    createNoteListIcons: {
      width: "1.2rem",
      height: "1.2rem",
      color: "#202124",
      opacity: "0.71",
    },
    notesRemainderLabel: {
      display: "flex",
      alignItems: "center",
      backgroundColor: timeGotOver ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.09)",
      borderRadius: "1.5rem",
      padding: "0.2rem 0 0.2rem 0.5rem",
      textDecoration: timeGotOver ? "line-through" : null,
      maxInlineSize: "fit-content",
      margin: "0.2rem 0",
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
      padding: "0.2rem 0 0.2rem 0.8rem",
      borderRadius: "1.5rem",
      backgroundColor: "rgba(0,0,0,0.09)",
      margin: "0.2rem",
      "&:hover $notesLabelClearIcon": {
        opacity: "1",
      },
    },
    notesLabelClearIcon: {
      padding: "0",
      fontSize: "1rem",
      opacity: "0",
    },
    notesCollaboratorImage: {
      backgroundColor: "rgba(0,0,0,0.09)",
      border: "0.05rem solid white",
      width: "2rem",
      height: "2rem",
      boxShadow: "0.04rem 0.04rem 0.1rem grey",
      margin: "0.05rem",
      color: "black",
    },
  }));

  const classes = useStyles();

  let tooglePinNote = () => {
    setIsPined(!isPined);
  };

  let toogleArchiveNote = () => {
    setIsArchived(!isArchived);
  };

  let removeReminder = () => {
    setReminder("");
  };

  let removeLabelFromNote = (labelId) => {
    let labels = noteLabels.filter((label) => label.id !== labelId);
    setNoteLabels(labels);
  };

  let addCollaborator = (user) => {
    setNoteCollaborators([...noteCollaborators, user]);
  };

  let removeCollaborator = (userId) => {
    setNoteCollaborators(
      noteCollaborators.filter((user) => user.userId !== userId)
    );
  };

  let addNote = () => {
    let labelIdList = noteLabels.map((label) => {
      return label.id;
    });
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("reminder", reminder);
    data.append("isArchived", isArchived);
    data.append("color", color);
    data.append("labelIdList", JSON.stringify(labelIdList));
    data.append("collaberators", JSON.stringify(noteCollaborators));
    if (title !== "" && description !== "") {
      setLoading(true);
      NoteServices.addNote(data)
        .then(() => {
          setLoading(false);
          message.setMessage("Note added Sucessfully");
          message.setSnackBar(true);
          props.getAllNotes();
        })
        .catch(() => {
          setLoading(false);
          message.setMessage("Some Error Occured while processing request");
          message.setSnackBar(true);
        });
    } else {
      message.setMessage("Title and description cannot be empty");
      message.setSnackBar(true);
    }
  };

  let addLabelFromNote = (labelId) => {
    let label = props.labelDetails.find((label) => label.id === labelId);
    setNoteLabels([...noteLabels, label]);
  };

  return (
    <>
      {loading ? <CircularProgress /> : null}
      <Paper className={classes.createNote}>
        <div className={classes.createNoteTittle}>
          <InputBase
            placeholder=" Title"
            fullWidth
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <PinNote
            isPined={isPined}
            tooglePinNote={tooglePinNote}
            pinClassName={classes.createNotePin}
          />
        </div>
        <InputBase
          multiline={true}
          rowsMax={20}
          placeholder=" Take a note..."
          fullWidth
          className={classes.createNoteDescription}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <div className={classes.notesLabels}>
          {reminder !== "" ? (
            <div className={classes.notesRemainderLabel}>
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
          {noteLabels.map((label, index) => {
            return (
              <span key={index} className={classes.notesLabelElement}>
                <span>{label.label}</span>
                {props.isBin ? null : (
                  <IconButton
                    className={classes.notesRemainderLabelClearButton}
                    onClick={() => removeLabelFromNote(label.id)}
                  >
                    <ClearOutlinedIcon
                      className={classes.notesLabelClearIcon}
                    />
                  </IconButton>
                )}
              </span>
            );
          })}
          {noteCollaborators.map((collaborator, index) => {
            return (
              <Tooltip
                title={collaborator.email}
                placement="bottom"
                key={index}
              >
                <Avatar className={classes.notesCollaboratorImage}>
                  {collaborator.firstName[0]}
                </Avatar>
              </Tooltip>
            );
          })}
        </div>
        <div className={classes.createNoteList}>
          <div>
            <RemindMe
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
              setReminder={setReminder}
            />
            <AddPersonIcon
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
              addCollaborator={addCollaborator}
              noteCollaborators={noteCollaborators}
              removeCollaborator={removeCollaborator}
              getAllNotes={() => {}}
            />
            <ColorPalletIcon
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
              setColor={setColor}
            />
            <AddImageIcon
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
            />
            <ArchiveNote
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
              toogleArchiveNote={toogleArchiveNote}
            />
            <MoreIcon
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
              noteLabels={noteLabels}
              labelDetails={props.labelDetails}
              removeLabelFromNote={removeLabelFromNote}
              addLabelFromNote={addLabelFromNote}
              getAllNotes={() => {}}
            />
          </div>
          <Button
            className={classes.createNoteCloseButton}
            onClick={() => {
              addNote();
              props.setShowMiniCreateNote();
            }}
          >
            Close
          </Button>
        </div>
      </Paper>
    </>
  );
}

export default CreateNote;
