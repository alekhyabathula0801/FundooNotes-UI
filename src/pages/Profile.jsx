import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import "../css/profile.css";

function Profile() {
  return (
    <div className="profile">
      <Header></Header>
      <main>
        <SideBar></SideBar>
        <main>Main</main>
      </main>
    </div>
  );
}

export default Profile;
