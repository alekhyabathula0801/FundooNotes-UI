import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import "../css/dashboard.css";
import DisplayNotes from "../components/DisplayNotes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Archive from "../components/Archive";

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
            <Router>
              <Switch>
                <Route exact path="/dashboard/" component={DisplayNotes} />
                <Route path="/dashboard/Archive" component={Archive} />
              </Switch>
            </Router>
          </main>
        </main>
      </div>
    );
  }
}

export default Dashboard;
