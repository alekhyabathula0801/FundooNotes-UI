import React, { useState, useEffect } from "react";
import NotesView from "../components/NotesView";
import NoteServices from "../services/NoteServices";

function Bin() {
  const [notesData, setNotesData] = useState([]);

  let getAllDeletedNotes = () => {
    NoteServices.getAllDeletedNotes()
      .then((response) => {
        setNotesData(response.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllDeletedNotes();
  }, []);

  return (
    <NotesView
      pinedNotes={[]}
      unPinedNotes={notesData}
      getAllNotes={getAllDeletedNotes}
      isBin={true}
    ></NotesView>
  );
}

export default Bin;
