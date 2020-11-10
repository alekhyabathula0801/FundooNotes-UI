import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Note from "./Note";
import Dialog from "@material-ui/core/Dialog";

function DisplayNotes(props) {
  const [showListView, setShowListView] = useState(props.showListView);
  const [open, setOpen] = React.useState(false);
  const [popUpNoteData, setPopUpNoteData] = useState([]);
  const [displayBlocksName, setDisplayBlocksName] = useState(true);

  const useStyles = makeStyles(() => ({
    notesView: {
      display: "inline-flex",
      width: "100%",
      background: "white",
      flexDirection: "column",
      justifyContent: "center",
    },
    notesViewList: {
      width: "auto",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: !showListView ? "center" : null,
      margin: "0 -5px",
    },
    notesFirstBlockName: {
      textAlign: !showListView ? "center" : "left",
      fontWeight: "500",
      color: "black",
      opacity: "0.69",
      padding: "0.5rem 0 0.5rem 0.8rem",
      fontSize: "1.1rem",
      display: displayBlocksName ? "block" : "none",
    },
    notesSecondBlockName: {
      textAlign: !showListView ? "center" : "left",
      fontWeight: "500",
      color: "grey",
      opacity: "0.97",
      padding: "0.5rem 0 0.5rem 0.8rem",
      fontSize: "1.1rem",
      display: displayBlocksName ? "block" : "none",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    findNonEmptyList();
  }, [props.notesDetails]);

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

  let findNonEmptyList = () => {
    let nonEmptyList = 0;
    props.notesDetails.forEach((notes) => {
      if (notes.notesList.length > 0) nonEmptyList++;
    });
    if (nonEmptyList === 1) setDisplayBlocksName(false);
    else setDisplayBlocksName(true);
  };

  let getNotes = (notesList) => {
    return Object.values(notesList)
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
      ));
  };

  return (
    <>
      <div className={classes.notesView}>
        {props.notesDetails.map((notesData, index) => {
          return (
            <div key={index}>
              <div
                className={
                  index === 0
                    ? classes.notesFirstBlockName
                    : classes.notesSecondBlockName
                }
              >
                {notesData.notesList.length > 0 ? notesData.blockName : null}
              </div>
              <div className={classes.notesViewList}>
                {getNotes(notesData.notesList)}
              </div>
            </div>
          );
        })}
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
