import React, { useState, useEffect } from "react";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import MiniCreateNote from "./MiniCreateNote";
import CircularProgress from "@material-ui/core/CircularProgress";

function Notes(props) {
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

  const pinedNotes = searchData.filter(
    (notes) => notes.isPined && !notes.isDeleted && !notes.isArchived
  );

  const unPinedNotes = searchData.filter(
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
          labelDetails={props.labelDetails}
        ></CreateNote>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <DisplayNotes
          pinedNotes={pinedNotes}
          unPinedNotes={unPinedNotes}
          getAllNotes={getAllNotes}
          isBin={false}
          showListView={showListView}
          labelDetails={props.labelDetails}
        ></DisplayNotes>
      )}
    </>
  );
}

export default Notes;
