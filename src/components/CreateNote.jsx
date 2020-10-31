import React, { useState, useContext } from "react";
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
import MessageContext from "../components/MessageContext";
import CircularProgress from "@material-ui/core/CircularProgress";

function CreateNote(props) {
  const message = useContext(MessageContext);
  const [isArchived, setIsArchived] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [isPined, setIsPined] = useState(false);
  const [loading, setLoading] = useState(false);

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
  }));

  const classes = useStyles();

  let tooglePinNote = () => {
    setIsPined(!isPined);
  };
  let toogleArchiveNote = () => {
    setIsArchived(!isArchived);
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
        <div className={classes.createNoteList}>
          <div>
            <RemindMe
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
            />
            <AddPersonIcon
              buttonClassName={classes.createNoteListIconButton}
              iconClassName={classes.createNoteListIcons}
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
            />
          </div>
          <Button
            className={classes.createNoteCloseButton}
            onClick={() => {
              let data = {};
              data = {
                title,
                description,
                isPined,
                color,
                isArchived,
              };
              if (title !== "" && description !== "") {
                setLoading(true);
                NoteServices.addNote(data)
                  .then((response) => {
                    setLoading(false);
                    message.setMessage("Note added Sucessfully");
                    message.setSnackBar(true);
                    props.getAllNotes();
                  })
                  .catch((err) => {
                    setLoading(false);
                    message.setMessage(
                      "Some Error Occured while processing request"
                    );
                    message.setSnackBar(true);
                  });
              } else {
                message.setMessage("Title and description cannot be empty");
                message.setSnackBar(true);
              }
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
