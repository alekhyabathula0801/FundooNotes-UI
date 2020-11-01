import React, { useState, useEffect } from "react";
import CreateNote from "../components/CreateNote";
import NotesView from "../components/NotesView";
import NoteServices from "../services/NoteServices";
import MiniCreateNote from "../components/MiniCreateNote";
import CircularProgress from "@material-ui/core/CircularProgress";

function Reminder(props) {
  const [showMiniCreateNote, setShowMiniCreateNote] = useState(true);
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(props.searchValue);

  useEffect(() => {
    setSearchValue(props.searchValue);
  }, [props.searchValue]);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllNotes = () => {
    setLoading(true);
    NoteServices.getAllNotes()
      .then((response) => {
        setNotesData(response.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  let toogleShowMiniCreateNote = () => {
    setShowMiniCreateNote(!showMiniCreateNote);
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  let searchData = [];
  if ((searchValue !== "") & (searchValue !== null)) {
    searchData = notesData.filter(
      (notes) =>
        notes.title.includes(searchValue) ||
        notes.description.includes(searchValue)
    );
  } else {
    searchData = notesData;
  }

  const notes = searchData.filter(
    (notes) =>
      !notes.isDeleted && !notes.isArchived && notes.reminder.length > 0
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
      {loading ? (
        <CircularProgress />
      ) : (
        <NotesView
          pinedNotes={[]}
          unPinedNotes={notes}
          getAllNotes={getAllNotes}
          isBin={false}
          showListView={showListView}
        ></NotesView>
      )}
    </>
  );
}

export default Reminder;
