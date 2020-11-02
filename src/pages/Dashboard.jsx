import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import "../css/dashboard.css";
import DisplayNotes from "../components/DisplayNotes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Archive from "../components/Archive";
import Bin from "../components/Bin";
import Reminder from "../components/Reminder";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDrawerLabels: true,
      showListView: true,
      searchValue: "",
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
    this.setListView = this.setListView.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
  }

  setShowDrawerLabels() {
    this.setState({ showDrawerLabels: !this.state.showDrawerLabels });
  }

  setListView() {
    this.setState({ showListView: !this.state.showListView });
  }

  setSearchValue(value) {
    this.setState({ searchValue: value });
  }

  render() {
    return (
      <div className="profile">
        <Header
          setShowDrawerLabels={this.setShowDrawerLabels}
          setListView={this.setListView}
          showListView={this.state.showListView}
          setSearchValue={this.setSearchValue}
        ></Header>
        <main>
          <SideBar showDrawerLabels={this.state.showDrawerLabels}></SideBar>
          <main>
            <Router>
              <Switch>
                <Route
                  exact
                  path={`/dashboard/`}
                  render={() => (
                    <DisplayNotes
                      showListView={this.state.showListView}
                      searchValue={this.state.searchValue}
                    />
                  )}
                />
                <Route
                  exact
                  path={`/dashboard/Reminders`}
                  render={() => (
                    <Reminder
                      showListView={this.state.showListView}
                      searchValue={this.state.searchValue}
                    />
                  )}
                />
                <Route
                  exact
                  path={`/dashboard/Archive`}
                  render={() => (
                    <Archive showListView={this.state.showListView} />
                  )}
                />
                <Route
                  exact
                  path={`/dashboard/Bin`}
                  render={() => <Bin showListView={this.state.showListView} />}
                />
              </Switch>
            </Router>
          </main>
        </main>
      </div>
    );
  }
}

export default Dashboard;
