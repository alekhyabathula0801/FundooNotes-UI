import React, { useState, useEffect } from "react";
import NotesView from "../components/NotesView";
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
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllArchiveNotes();
  }, []);

  const unPinedNotes = notesData.filter(
    (notes) => !notes.isPined && !notes.isDeleted && notes.isArchived
  );

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <NotesView
          pinedNotes={[]}
          unPinedNotes={unPinedNotes}
          getAllNotes={getAllArchiveNotes}
          showListView={showListView}
          labelDetails={props.labelDetails}
        ></NotesView>
      )}
    </>
  );
}

export default Archive;
