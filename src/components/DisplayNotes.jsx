import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Note from "./Note";
import Dialog from "@material-ui/core/Dialog";

function DisplayNotes(props) {
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
            <Note
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
            ></Note>
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
            <Note
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
            ></Note>
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
        <Note
          data={popUpNoteData}
          isPopUp={true}
          closePopUp={handleClose}
          showCloseButton={true}
          getAllNotes={props.getAllNotes}
          isBin={props.isBin}
          labelDetails={props.labelDetails}
        ></Note>
      </Dialog>
    </>
  );
}

export default DisplayNotes;
