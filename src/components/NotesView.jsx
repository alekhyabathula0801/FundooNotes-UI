import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Notes from "./Notes";
import Dialog from "@material-ui/core/Dialog";

function NotesView(props) {
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

  const [open, setOpen] = React.useState(false);
  const [notesData, setNotesData] = React.useState(props.notesData);
  const [popUpNoteData, setPopUpNoteData] = React.useState([]);
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
    setNotesData(props.notesData);
  }, [props.notesData]);

  return (
    <>
      <div className={classes.notesView}>
        {Object.values(notesData).map((notesData, index) => (
          <Notes
            key={index}
            data={notesData}
            showCloseButton={false}
            getNotesData={getPopUpNotesData}
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
        <Notes
          data={popUpNoteData}
          isPopUp={true}
          closePopUp={handleClose}
          showCloseButton={true}
        ></Notes>
      </Dialog>
    </>
  );
}

export default NotesView;
