import React, { useState, useEffect, useContext } from "react";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageContext from "./MessageContext";

function Archive(props) {
  const message = useContext(MessageContext);
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllArchiveNotes = (load = false) => {
    if (load) setLoading(load);
    NoteServices.getAllArchiveNotes()
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
    getAllArchiveNotes(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const notes = notesData.filter(
    (notes) => !notes.isPined && !notes.isDeleted && notes.isArchived
  );

  let notesDetails = [
    {
      blockName: "Reminder",
      notesList: notes,
    },
  ];

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DisplayNotes
          notesDetails={notesDetails}
          getAllNotes={getAllArchiveNotes}
          showListView={showListView}
          labelDetails={props.labelDetails}
        ></DisplayNotes>
      )}
    </>
  );
}

export default Archive;
