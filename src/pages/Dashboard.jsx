import React from "react";
import Header from "../components/AppBar";
import SideBar from "../components/Drawer";
import DisplayNotes from "../components/DisplayNotes";
import { Route, Switch } from "react-router-dom";
import Archive from "../components/Archive";
import Bin from "../components/Bin";
import Reminder from "../components/Reminder";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  IconButton,
  InputBase,
  Tooltip,
  Button,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import LabelIcon from "@material-ui/icons/Label";
import NoteServices from "../services/NoteServices";
import "../css/dashboard.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDrawerLabels: true,
      showListView: true,
      searchValue: "",
      heading: "Notes",
      openEditLabelPopup: false,
      createLabel: true,
      newLabel: "",
      labels: [],
      labelDetails: [],
      updateLabel: "",
    };
    this.setShowDrawerLabels = this.setShowDrawerLabels.bind(this);
    this.setListView = this.setListView.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.setHeading = this.setHeading.bind(this);
    this.closeEditLabelPopup = this.closeEditLabelPopup.bind(this);
    this.openEditLabelPopup = this.openEditLabelPopup.bind(this);
    this.onCreateLabel = this.onCreateLabel.bind(this);
    this.offCreateLabel = this.offCreateLabel.bind(this);
    this.setNewLabel = this.setNewLabel.bind(this);
    this.setLabels = this.setLabels.bind(this);
    this.setUpdateLabel = this.setUpdateLabel.bind(this);
  }

  setUpdateLabel(value) {
    this.setState({ updateLabel: value });
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

  setNewLabel(value) {
    this.setState({ newLabel: value });
  }

  onCreateLabel() {
    this.setState({ createLabel: true });
  }

  offCreateLabel() {
    this.setState({ createLabel: false });
    this.setNewLabel("");
  }

  setHeading(value) {
    this.setState({ heading: value });
  }

  componentDidMount() {
    let path = window.location.pathname.split("/dashboard/")[1];
    if (path === undefined) this.setHeading("Notes");
    else this.setHeading(path);
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
                  path={`/dashboard/`}
                  render={() => (
                    <DisplayNotes
                      showListView={this.state.showListView}
                      searchValue={this.state.searchValue}
                      labelDetails={this.state.labelDetails}
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
                      labelDetails={this.state.labelDetails}
                    />
                  )}
                />
                <Route
                  exact
                  path={`/dashboard/Archive`}
                  render={() => (
                    <Archive
                      showListView={this.state.showListView}
                      labelDetails={this.state.labelDetails}
                    />
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
        <Dialog
          open={this.state.openEditLabelPopup}
          onClose={this.closeEditLabelPopup}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="simple-dialog-title"
            className="dashboard--edit--labels"
          >
            Edit labels
          </DialogTitle>
          <List>
            <ListItem className="dashboard__edit__labels__list__item" key={0}>
              {this.state.createLabel ? (
                <Tooltip title="cancel" placement="bottom">
                  <IconButton onClick={() => this.offCreateLabel()}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Create label" placement="bottom">
                  <IconButton onClick={() => this.onCreateLabel()}>
                    <AddOutlinedIcon />
                  </IconButton>
                </Tooltip>
              )}
              <InputBase
                placeholder="Create New Labels"
                defaultValue={this.state.newLabel}
                onChange={(e) => this.setNewLabel(e.currentTarget.value)}
                onClick={
                  !this.state.createLabel ? () => this.onCreateLabel() : null
                }
              />
              {this.state.createLabel ? (
                <Tooltip title="Create label" placement="bottom">
                  <IconButton
                    onClick={() => {
                      let userId = "";
                      if (
                        JSON.parse(localStorage.getItem("fundoo-notes")) !==
                        null
                      ) {
                        userId = JSON.parse(
                          localStorage.getItem("fundoo-notes")
                        ).data.userId;
                      }
                      if (this.state.newLabel !== "") {
                        const data = {
                          isDeleted: false,
                          label: this.state.newLabel,
                          userId: userId,
                        };
                        NoteServices.addLabel(data)
                          .then((response) => {
                            console.log(response.data);
                            this.setLabels();
                            this.setNewLabel("");
                          })
                          .catch((error) => console.log(error));
                        console.log(data);
                      }
                    }}
                  >
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </ListItem>
            {this.state.labelDetails.map((label, index) => {
              return (
                <ListItem
                  className="dashboard__edit__labels__list__item"
                  key={index + 1}
                >
                  <Tooltip title="Delete label" placement="bottom">
                    <IconButton
                      onClick={() => {
                        NoteServices.deleteLabel(label.id)
                          .then((response) => {
                            console.log(response);
                            this.setLabels();
                          })
                          .catch((error) => console.log(error));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <InputBase
                    placeholder="Rename Labels"
                    defaultValue={label.label}
                    onChange={(e) => this.setUpdateLabel(e.currentTarget.value)}
                  />
                  <Tooltip title="Rename label" placement="bottom">
                    <IconButton
                      onClick={() => {
                        let data = {
                          label: this.state.updateLabel,
                        };
                        NoteServices.updateLabel(data, label.id)
                          .then(() => {
                            this.setUpdateLabel("");
                            this.setLabels();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
          <Button onClick={() => this.closeEditLabelPopup()}>Close</Button>
        </Dialog>
      </>
    );
  }
}

export default Dashboard;
