import React, { useState, useEffect } from "react";
import NotesView from "../components/NotesView";
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
        <NotesView
          pinedNotes={[]}
          unPinedNotes={notesData}
          getAllNotes={getAllDeletedNotes}
          isBin={true}
          showListView={showListView}
        ></NotesView>
      )}
    </>
  );
}

export default Bin;
