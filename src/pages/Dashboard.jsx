import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import "../css/dashboard.css";
import DisplayNotes from "../components/DisplayNotes";
import { Route, Switch } from "react-router-dom";
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
      heading: "Notes",
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
    this.setListView = this.setListView.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.setHeading = this.setHeading.bind(this);
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

  setHeading(value) {
    this.setState({ heading: value });
  }

  componentDidMount() {
    let path = window.location.pathname.split("/dashboard/")[1];
    if (path === undefined) this.setHeading("Notes");
    else this.setHeading(path);
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
          <SideBar
            showDrawerLabels={this.state.showDrawerLabels}
            heading={this.state.heading}
            setHeading={this.setHeading}
          ></SideBar>
          <main>
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
          </main>
        </main>
      </div>
    );
  }
}

export default Dashboard;
