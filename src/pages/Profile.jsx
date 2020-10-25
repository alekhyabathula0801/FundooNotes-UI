import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import NotesBeforeClick from "../components/NotesBeforeClick";
import "../css/profile.css";

function Profile() {
  return (
    <div className="profile">
      <Header></Header>
      <main>
        <SideBar></SideBar>
        <main>
          <NotesBeforeClick></NotesBeforeClick>
          <div>Lists of notes</div>
        </main>
      </main>
    </div>
  );
}

export default Profile;
