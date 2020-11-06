import React, { useState, useEffect } from "react";
import CreateNote from "../components/CreateNote";
import DisplayNotes from "./DisplayNotes";
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

  let notesDetails = [
    {
      blockName: "Reminder",
      notesList: notes,
    },
  ];

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
        <DisplayNotes
          notesDetails={notesDetails}
          getAllNotes={getAllNotes}
          isBin={false}
          showListView={showListView}
          labelDetails={props.labelDetails}
        ></DisplayNotes>
      )}
    </>
  );
}

export default Reminder;
