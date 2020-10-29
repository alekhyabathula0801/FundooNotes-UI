import React, { useState, useEffect } from "react";
import CreateNote from "../components/CreateNote";
import NotesView from "../components/NotesView";
import NoteServices from "../services/NoteServices";
import MiniCreateNote from "../components/MiniCreateNote";

function DisplayNotes() {
  const [showMiniCreateNote, setShowMiniCreateNote] = useState(true);
  const [notesData, setNotesData] = useState([]);
  let getAllNotes = () => {
    NoteServices.getAllNotes()
      .then((response) => {
        setNotesData(response.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let toogleShowMiniCreateNote = () => {
    setShowMiniCreateNote(!showMiniCreateNote);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const pinedNotes = notesData.filter(
    (notes) => notes.isPined && !notes.isDeleted && !notes.isArchived
  );

  const unPinedNotes = notesData.filter(
    (notes) => !notes.isPined && !notes.isDeleted && !notes.isArchived
  );

  return (
    <>
      {showMiniCreateNote ? (
        <MiniCreateNote
          setShowMiniCreateNote={toogleShowMiniCreateNote}
          showMiniCreateNote={showMiniCreateNote}
        ></MiniCreateNote>
      ) : (
        <CreateNote
          setShowMiniCreateNote={toogleShowMiniCreateNote}
          showMiniCreateNote={showMiniCreateNote}
          getAllNotes={getAllNotes}
        ></CreateNote>
      )}
      <NotesView
        pinedNotes={pinedNotes}
        unPinedNotes={unPinedNotes}
        getAllNotes={getAllNotes}
        isBin={false}
      ></NotesView>
    </>
  );
}

export default DisplayNotes;
