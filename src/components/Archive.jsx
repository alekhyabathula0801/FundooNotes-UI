import React, { useState, useEffect } from "react";
import NotesView from "../components/NotesView";
import NoteServices from "../services/NoteServices";

function Archive(props) {
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllArchiveNotes = () => {
    NoteServices.getAllArchiveNotes()
      .then((response) => {
        setNotesData(response.data.data.data);
      })
      .catch((err) => {
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
    <NotesView
      pinedNotes={[]}
      unPinedNotes={unPinedNotes}
      getAllNotes={getAllArchiveNotes}
      showListView={showListView}
    ></NotesView>
  );
}

export default Archive;
