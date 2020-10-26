import React, { useState, useEffect } from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import MiniCreateNote from "../components/MiniCreateNote";
import "../css/profile.css";
import { makeStyles } from "@material-ui/core/styles";
import CreateNote from "../components/CreateNote";

const useStyles = makeStyles(() => ({
  profileMain: {
    width: "82.5%",
  },
  profileMainMaximize: {
    width: "95%",
  },
}));

function Profile() {
  const classes = useStyles();
  const [showDrawerLabels, setShowDrawerLabels] = useState(true);
  const [showMiniCreateNote, setShowMiniCreateNote] = useState(true);
  useEffect(() => console.log("show drawer labels is " + showDrawerLabels));
  return (
    <div className="profile">
      <Header
        setShowDrawerLabels={setShowDrawerLabels}
        showDrawerLabels={showDrawerLabels}
      ></Header>
      <main>
        <SideBar showDrawerLabels={showDrawerLabels}></SideBar>
        <main
          className={
            showDrawerLabels
              ? `${classes.profileMain}`
              : `${classes.profileMainMaximize}`
          }
        >
          {showMiniCreateNote ? (
            <MiniCreateNote
              setShowMiniCreateNote={setShowMiniCreateNote}
              showMiniCreateNote={showMiniCreateNote}
            ></MiniCreateNote>
          ) : (
            <CreateNote
              setShowMiniCreateNote={setShowMiniCreateNote}
              showMiniCreateNote={showMiniCreateNote}
            ></CreateNote>
          )}
          <div>Lists of notes</div>
        </main>
      </main>
    </div>
  );
}

export default Profile;
