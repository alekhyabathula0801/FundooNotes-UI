import React, { useState, useEffect, useContext } from "react";
import CreateNote from "../components/CreateNote";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import MiniCreateNote from "../components/MiniCreateNote";
import CircularProgress from "@material-ui/core/CircularProgress";
import CalculateTime from "../util/CalculateTime";
import MessageContext from "./MessageContext";

function Reminder(props) {
  const message = useContext(MessageContext);
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

  let getAllNotes = (load = false) => {
    if (load) setLoading(load);
    NoteServices.getAllNotes()
      .then((response) => {
        setNotesData(response.data.data.data);
      })
      .catch(() => {
        message.setMessage("Some Error Occured while processing request");
        message.setSnackBar(true);
      })
      .finally(() => {
        if (load) setLoading(false);
      });
  };

  let toogleShowMiniCreateNote = () => {
    setShowMiniCreateNote(!showMiniCreateNote);
  };

  useEffect(() => {
    getAllNotes(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  let isExpired = (reminderDate) => {
    const [, , over] = CalculateTime(reminderDate, false);
    return over;
  };

  let getReminderNotes = (expired) => {
    return searchData.filter(
      (notes) =>
        !notes.isDeleted &&
        !notes.isArchived &&
        notes.reminder.length > 0 &&
        isExpired(notes.reminder[0]) === expired
    );
  };

  let notesDetails = [
    {
      blockName: "FIRED",
      notesList: getReminderNotes(true),
    },
    {
      blockName: "UPCOMING",
      notesList: getReminderNotes(false),
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
          labelDetails={props.labelDetails}
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
