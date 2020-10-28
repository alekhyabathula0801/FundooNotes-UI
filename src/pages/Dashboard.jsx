import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import "../css/dashboard.css";
import DisplayNotes from "../components/DisplayNotes";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDrawerLabels: true,
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
  }

  setShowDrawerLabels() {
    this.setState({ showDrawerLabels: !this.state.showDrawerLabels });
  }

  render() {
    return (
      <div className="profile">
        <Header setShowDrawerLabels={this.setShowDrawerLabels}></Header>
        <main>
          <SideBar showDrawerLabels={this.state.showDrawerLabels}></SideBar>
          <main>
            <DisplayNotes></DisplayNotes>
          </main>
        </main>
      </div>
    );
  }
}

export default Dashboard;
