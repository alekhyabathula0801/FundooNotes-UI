import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Notes from "./Notes";
import Dialog from "@material-ui/core/Dialog";

function NotesView(props) {
  const [showListView, setShowListView] = useState(props.showListView);

  const useStyles = makeStyles(() => ({
    notesView: {
      display: "inline-flex",
      width: "100%",
      background: "white",
      flexDirection: "column",
      justifyContent: "center",
    },
    notesViewList: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: !showListView ? "center" : null,
    },
    notesViewPinned: {
      textAlign: !showListView ? "center" : "left",
      fontWeight: "500",
      color: "black",
      opacity: "0.69",
      padding: "0.5rem 0 0.5rem 0.8rem",
      fontSize: "1.1rem",
    },
    notesViewUnPinned: {
      textAlign: !showListView ? "center" : "left",
      fontWeight: "500",
      color: "grey",
      opacity: "0.97",
      padding: "0.5rem 0 0.5rem 0.8rem",
      fontSize: "1.1rem",
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [pinedNotes, setPinedNotes] = useState(props.pinedNotes);
  const [unPinedNotes, setUnPinedNotes] = useState(props.unPinedNotes);
  const [popUpNoteData, setPopUpNoteData] = useState([]);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPopUpNotesData = (data) => {
    setPopUpNoteData(data);
  };

  useEffect(() => {
    setPinedNotes(props.pinedNotes);
  }, [props.pinedNotes]);

  useEffect(() => {
    setUnPinedNotes(props.unPinedNotes);
  }, [props.unPinedNotes]);

  const pinedNotesContent = (
    <>
      {pinedNotes.length > 0 ? (
        <div className={classes.notesViewPinned}>PINNED</div>
      ) : null}
      <div className={classes.notesViewList}>
        {Object.values(pinedNotes)
          .reverse()
          .map((notesData, index) => (
            <Notes
              key={index}
              data={notesData}
              showCloseButton={false}
              getNotesData={getPopUpNotesData}
              handleClickOpen={handleClickOpen}
              isPopUp={false}
              getAllNotes={props.getAllNotes}
              isBin={props.isBin}
              showListView={showListView}
              labelDetails={props.labelDetails}
            ></Notes>
          ))}
      </div>
    </>
  );

  const unPinedNotesContent = (
    <>
      {pinedNotes.length > 0 && unPinedNotes.length > 0 ? (
        <div className={classes.notesViewUnPinned}>OTHERS</div>
      ) : null}
      <div className={classes.notesViewList}>
        {Object.values(unPinedNotes)
          .reverse()
          .map((notesData, index) => (
            <Notes
              key={index + pinedNotes.length}
              data={notesData}
              showCloseButton={false}
              getNotesData={getPopUpNotesData}
              handleClickOpen={handleClickOpen}
              isPopUp={false}
              getAllNotes={props.getAllNotes}
              isBin={props.isBin}
              showListView={showListView}
              labelDetails={props.labelDetails}
            ></Notes>
          ))}
      </div>
    </>
  );

  return (
    <>
      <div className={classes.notesView}>
        {pinedNotesContent}
        {unPinedNotesContent}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Notes
          data={popUpNoteData}
          isPopUp={true}
          closePopUp={handleClose}
          showCloseButton={true}
          getAllNotes={props.getAllNotes}
          isBin={props.isBin}
          labelDetails={props.labelDetails}
        ></Notes>
      </Dialog>
    </>
  );
}

export default NotesView;
