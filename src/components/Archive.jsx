import React, { useState, useEffect } from "react";
import NotesView from "../components/NotesView";
import FundooNoteServices from "../services/FundooNoteServices";

function Archive() {
  const [notesData, setNotesData] = useState([]);
  
  let getAllArchiveNotes = () => {
    FundooNoteServices.getAllArchiveNotes()
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
    ></NotesView>
  );
}

export default Archive;
