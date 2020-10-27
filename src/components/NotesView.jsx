import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Notes from "./Notes";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

function NotesView() {
  const useStyles = makeStyles(() => ({
    notesView: {
      display: "inline-flex",
      width: "100%",
      background: "white",
      flexWrap: "wrap",
      alignItems: "flex-start",
      position: "relative",
    },
  }));
  const classes = useStyles();
  const data = [
    {
      title: "demo1",
      description: "demo 1 desc",
      color: "#ffffff",
      isPined: false,
      isArchived: false,
    },
    {
      title: "demo2",
      description: "demo 1 desc",
      color: "#ffffff",
      isPined: false,
      isArchived: false,
    },
    {
      title: "demo1",
      description: "demo 1 desc demo 1 desc demo 1 desc demo 1 desc ",
      color: "#ffffff",
      isPined: false,
      isArchived: false,
    },
    {
      title: "demo1",
      description: "demo 1 desc demo 1 desc demo 1 desc demo 1 desc ",
      color: "#ffffff",
      isPined: false,
      isArchived: false,
    },
    {
      title: "demo1",
      description: "demo 1 desc demo 1 desc demo 1 desc demo 1 desc ",
      color: "#ffffff",
      isPined: false,
      isArchived: false,
    },
    {
      title: "demo1",
      description: "demo 1 desc demo 1 desc demo 1 desc demo 1 desc ",
      color: "#ffffff",
      isPined: false,
      isArchived: false,
    },
  ];
  const [open, setOpen] = React.useState(false);
  const [notesData, setNotesData] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNotesData = (data) => {
    setNotesData(data);
  };
  return (
    <>
      <div className={classes.notesView}>
        {data.map((data, index) => (
          <Notes
            key={index}
            data={data}
            showCloseButton={false}
            getNotesData={getNotesData}
            handleClickOpen={handleClickOpen}
            isPopUp={false}
          ></Notes>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Notes data={notesData} isPopUp={true} showCloseButton={true}></Notes>
      </Dialog>
    </>
  );
}

export default NotesView;
