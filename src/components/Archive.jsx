import React, { useState, useEffect } from "react";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import CircularProgress from "@material-ui/core/CircularProgress";

function Archive(props) {
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllArchiveNotes = () => {
    setLoading(true);
    NoteServices.getAllArchiveNotes()
      .then((response) => {
        setLoading(false);
        setNotesData(response.data.data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllArchiveNotes();
  }, []);

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
