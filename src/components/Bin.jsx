import React, { useState, useEffect } from "react";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import CircularProgress from "@material-ui/core/CircularProgress";

function Bin(props) {
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllDeletedNotes = (load = false) => {
    setLoading(load);
    NoteServices.getAllDeletedNotes()
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
    getAllDeletedNotes(true);
  }, []);

  let notesDetails = [
    {
      blockName: "Bin",
      notesList: notesData,
    },
  ];

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DisplayNotes
          notesDetails={notesDetails}
          getAllNotes={getAllDeletedNotes}
          isBin={true}
          showListView={showListView}
        />
      )}
    </>
  );
}

export default Bin;
