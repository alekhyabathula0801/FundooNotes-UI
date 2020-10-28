import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import MiniCreateNote from "../components/MiniCreateNote";
import "../css/dashboard.css";
import CreateNote from "../components/CreateNote";
import NotesView from "../components/NotesView";
import FundooNoteServices from "../services/FundooNoteServices";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDrawerLabels: true,
      showMiniCreateNote: true,
      notesData: [],
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
    this.setShowMiniCreateNote = this.setShowMiniCreateNote.bind(this);
    this.getAllNotes = this.getAllNotes.bind(this);
  }

  setShowDrawerLabels() {
    this.setState({ showDrawerLabels: !this.state.showDrawerLabels });
  }

  setShowMiniCreateNote() {
    this.setState({ showMiniCreateNote: !this.state.showMiniCreateNote });
  }

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes() {
    FundooNoteServices.getAllNotes()
      .then((response) => {
        this.setState({ notesData: response.data.data.data }, () => {
          console.log("in get all notes 45 " + this.state.notesData);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="profile">
        <Header setShowDrawerLabels={this.setShowDrawerLabels}></Header>
        <main>
          <SideBar showDrawerLabels={this.state.showDrawerLabels}></SideBar>
          <main>
            {this.state.showMiniCreateNote ? (
              <MiniCreateNote
                setShowMiniCreateNote={this.setShowMiniCreateNote}
                showMiniCreateNote={this.state.showMiniCreateNote}
              ></MiniCreateNote>
            ) : (
              <CreateNote
                setShowMiniCreateNote={this.setShowMiniCreateNote}
                showMiniCreateNote={this.state.showMiniCreateNote}
                getAllNotes={this.getAllNotes}
              ></CreateNote>
            )}
            <NotesView
              notesData={this.state.notesData}
              getAllNotes={this.getAllNotes}
            ></NotesView>
          </main>
        </main>
      </div>
    );
  }
}

export default Dashboard;
