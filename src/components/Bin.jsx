import React, { useState, useEffect, useContext } from "react";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageContext from "./MessageContext";

function Bin(props) {
  const message = useContext(MessageContext);
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllDeletedNotes = (load = false) => {
    if (load) setLoading(load);
    NoteServices.getAllDeletedNotes()
      .then((response) => {
        setNotesData(response.data.data.data);
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      })
      .finally(() => {
        if (load) setLoading(false);
      });
  };

  useEffect(() => {
    getAllDeletedNotes(true);
  }, []);

  let notesDetails = [
    {
      blockName: "Bin",
      notesList: notesData,
    },
  ];

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DisplayNotes
          notesDetails={notesDetails}
          getAllNotes={getAllDeletedNotes}
          isBin={true}
          showListView={showListView}
        />
      )}
    </>
  );
}

export default Bin;
