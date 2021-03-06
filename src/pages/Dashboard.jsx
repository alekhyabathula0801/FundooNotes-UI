import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import Notes from "../components/Notes";
import { Redirect, Route, Switch } from "react-router-dom";
import Archive from "../components/Archive";
import Bin from "../components/Bin";
import Reminder from "../components/Reminder";
import NoteServices from "../services/NoteServices";
import "../css/dashboard.css";
import EditLabelsPopup from "../components/EditLabelsPopup";

class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showDrawerLabels: true,
      showListView: true,
      searchValue: "",
      heading: {
        title: "Notes",
        action: "notes",
      },
      openEditLabelPopup: false,
      createLabel: true,
      labels: [],
      labelDetails: [],
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
    this.setListView = this.setListView.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.setHeading = this.setHeading.bind(this);
    this.closeEditLabelPopup = this.closeEditLabelPopup.bind(this);
    this.openEditLabelPopup = this.openEditLabelPopup.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.updateLabel = this.updateLabel.bind(this);
    this.deleteLabel = this.deleteLabel.bind(this);
    this.notesRef = React.createRef();
  }

  addLabel(newLabel) {
    let userId = "";
    if (localStorage.getItem("userId") !== null) {
      userId = localStorage.getItem("userId");
    }
    if (newLabel !== "") {
      const data = {
        isDeleted: false,
        label: newLabel,
        userId: userId,
      };
      NoteServices.addLabel(data)
        .then(() => {
          this.setLabels();
        })
        .catch((error) => console.log(error));
    }
  }

  updateLabel(updateLabel, labelId) {
    if (updateLabel !== "") {
      let data = {
        label: updateLabel,
      };
      NoteServices.updateLabel(data, labelId)
        .then(() => {
          this.setLabels();
          this.notesRef.current.getAllNote();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  deleteLabel(labelId) {
    NoteServices.deleteLabel(labelId)
      .then(() => {
        this.setLabels();
        this.notesRef.current.getAllNote();
      })
      .catch((error) => console.log(error));
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
    if (path === undefined)
      this.setHeading({
        title: "Notes",
        action: "notes",
      });
    else if (path.includes("label/"))
      this.setHeading({
        title: path.split("label/")[1],
        action: "label",
      });
    else
      this.setHeading({
        title: path,
        action: path.toLowerCase(),
      });
    this.setLabels();
  }

  closeEditLabelPopup() {
    this.setState({ openEditLabelPopup: false });
  }

  openEditLabelPopup() {
    this.setState({ openEditLabelPopup: true });
  }

  setLabels() {
    NoteServices.getLabelsList()
      .then((response) => {
        this.setState({ labelDetails: response.data.data.details });
        const labelsOnly = response.data.data.details.map((label) => {
          return label.label;
        });
        this.setState({ labels: labelsOnly });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        <div className="profile">
          <Header
            setShowDrawerLabels={this.setShowDrawerLabels}
            setListView={this.setListView}
            showListView={this.state.showListView}
            setSearchValue={this.setSearchValue}
            heading={this.state.heading}
            searchValue={this.state.searchValue}
          ></Header>
          <main>
            <SideBar
              showDrawerLabels={this.state.showDrawerLabels}
              heading={this.state.heading}
              setHeading={this.setHeading}
              openEditLabelPopup={this.openEditLabelPopup}
              labels={this.state.labels}
            ></SideBar>
            <main>
              <Switch>
                <Route
                  exact
                  path="/dashboard/"
                  render={() => (
                    <Notes
                      label={""}
                      showListView={this.state.showListView}
                      searchValue={this.state.searchValue}
                      labelDetails={this.state.labelDetails}
                      ref={this.notesRef}
                    />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/Reminders"
                  render={() => (
                    <Reminder
                      showListView={this.state.showListView}
                      searchValue={this.state.searchValue}
                      labelDetails={this.state.labelDetails}
                    />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/Archive"
                  render={() => (
                    <Archive
                      showListView={this.state.showListView}
                      labelDetails={this.state.labelDetails}
                    />
                  )}
                />
                <Route
                  exact
                  path="/dashboard/Bin"
                  render={() => <Bin showListView={this.state.showListView} />}
                />
                {this.state.labelDetails.map((label, index) => {
                  return (
                    <Route
                      key={index}
                      exact
                      path={`/dashboard/label/` + label.label}
                      render={() => (
                        <Notes
                          label={label.label}
                          searchValue={this.state.searchValue}
                          labelDetails={this.state.labelDetails}
                          showListView={this.state.showListView}
                        />
                      )}
                    />
                  );
                })}
                <Route
                  path="/dashboard/*"
                  render={() => <Redirect to="/*" />}
                />
              </Switch>
            </main>
          </main>
        </div>
        <EditLabelsPopup
          openEditLabelPopup={this.state.openEditLabelPopup}
          closeEditLabelPopup={this.closeEditLabelPopup}
          addLabel={this.addLabel}
          updateLabel={this.updateLabel}
          deleteLabel={this.deleteLabel}
          labelDetails={this.state.labelDetails}
          labels={this.state.labels}
        />
      </>
    );
  }
}

export default Dashboard;
