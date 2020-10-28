import React, { useState, useEffect } from "react";
import { IconButton, Paper, InputBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import FundooNoteServices from "../services/FundooNoteServices";
import ColorPalletIcon from "./ColorPalletIcon";

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
  }, [props.data.noteId]);

  useEffect(() => {
    setNoteData(props.data);
  }, [props.data]);

  const useStyles = makeStyles((theme) => ({
    note: {
      display: "inline-flex",
      width: !props.isPopUp ? "14rem" : "30rem",
      background: "white",
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
        <IconButton
          onClick={() => {
            let data = {};
            data = {
              isPined: !isPined,
              noteIdList: [noteId],
            };
            FundooNoteServices.tooglePinNote(data)
              .then((response) => {
                console.log(response.data);
                props.getAllNotes();
              })
              .catch((error) => console.log(error));
          }}
        >
          {!noteData.isPined ? (
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
          <IconButton className={classes.notesListIconButtons}>
            <AddAlertOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton className={classes.notesListIconButtons}>
            <PersonAddOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <ColorPalletIcon
            buttonClassName={classes.notesListIconButtons}
            iconClassName={classes.noteListIcons}
          ></ColorPalletIcon>
          <IconButton className={classes.notesListIconButtons}>
            <CropOriginalOutlinedIcon className={classes.noteListIcons} />
          </IconButton>
          <IconButton
            className={classes.notesListIconButtons}
            onClick={() => {
              let data = {};
              data = {
                isArchived: !isArchived,
                noteIdList: [noteId],
              };
              FundooNoteServices.toogleArchiveNote(data)
                .then((response) => {
                  console.log("Archive response data " + response.data);
                  props.getAllNotes();
                })
                .catch((error) => console.log(error));
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
              title: title,
              description: description,
              noteId: noteId,
            };
            if (title !== "" && description !== "") {
              FundooNoteServices.updateNote(data)
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
