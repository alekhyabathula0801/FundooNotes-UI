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
      data:[],
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
    this.setShowMiniCreateNote = this.setShowMiniCreateNote.bind(this);
  }

  setShowDrawerLabels() {
    this.setState({ showDrawerLabels: !this.state.showDrawerLabels });
  }

  setShowMiniCreateNote() {
    this.setState({ showMiniCreateNote: !this.state.showMiniCreateNote });
  }

  render() {
    return (
      <div className="profile">
        <Header setShowDrawerLabels={this.setShowDrawerLabels}></Header>
        <main>
          <SideBar showDrawerLabels={this.state.showDrawerLabels}></SideBar>
          <main
            className={
              this.state.showDrawerLabels
                ? `profile--main`
                : `profile--main-maximize`
            }
          >
            {this.state.showMiniCreateNote ? (
              <MiniCreateNote
                setShowMiniCreateNote={this.setShowMiniCreateNote}
                showMiniCreateNote={this.state.showMiniCreateNote}
              ></MiniCreateNote>
            ) : (
              <CreateNote
                setShowMiniCreateNote={this.setShowMiniCreateNote}
                showMiniCreateNote={this.state.showMiniCreateNote}
              ></CreateNote>
            )}
            <NotesView></NotesView>
          </main>
        </main>
      </div>
    );
  }
}

export default Dashboard;
