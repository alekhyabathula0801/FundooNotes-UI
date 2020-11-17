import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import CreateNote from "./CreateNote";
import DisplayNotes from "./DisplayNotes";
import NoteServices from "../services/NoteServices";
import MiniCreateNote from "./MiniCreateNote";
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageContext from "./MessageContext";

const Notes = forwardRef((props, ref) => {
  const message = useContext(MessageContext);
  const [showMiniCreateNote, setShowMiniCreateNote] = useState(true);
  const [notesData, setNotesData] = useState([]);
  const [showListView, setShowListView] = useState(props.showListView);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(props.searchValue);

  useImperativeHandle(ref, () => ({
    getAllNote() {
      getAllNotes();
    },
  }));

  useEffect(() => {
    setSearchValue(props.searchValue);
  }, [props.searchValue]);

  useEffect(() => {
    setShowListView(props.showListView);
  }, [props.showListView]);

  let getAllNotes = (load = false) => {
    if (load) setLoading(load);
    if (props.label !== "") {
      NoteServices.getNotesByLabel(props.label)
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
    } else {
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
    }
  };

  let toogleShowMiniCreateNote = () => {
    setShowMiniCreateNote(!showMiniCreateNote);
  };

  useEffect(() => {
    getAllNotes(true);
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

  let notesDetails = [
    {
      blockName: "PINNED",
      notesList: pinedNotes,
    },
    {
      blockName: "OTHERS",
      notesList: unPinedNotes,
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
});

export default Notes;
