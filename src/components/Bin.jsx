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

  let getAllDeletedNotes = () => {
    setLoading(true);
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
    getAllDeletedNotes();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DisplayNotes
          pinedNotes={[]}
          unPinedNotes={notesData}
          getAllNotes={getAllDeletedNotes}
          isBin={true}
          showListView={showListView}
        ></DisplayNotes>
      )}
    </>
  );
}

export default Bin;
