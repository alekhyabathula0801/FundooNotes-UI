import React, { useState, useEffect } from "react";
import NotesView from "../components/NotesView";
import NoteServices from "../services/NoteServices";

function Bin(props) {
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

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
      showListView={showListView}
    ></NotesView>
  );
}

export default Bin;
