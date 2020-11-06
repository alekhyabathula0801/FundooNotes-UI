import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  IconButton,
  Button,
  DialogActions,
  InputBase,
} from "@material-ui/core";
import "../css/dashboard.css";
import NoteServices from "../services/NoteServices";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

function Collaborator(props) {
  let userDetails = {};
  if (localStorage.getItem("token") !== null) {
    userDetails = {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      imageUrl: localStorage.getItem("imageUrl"),
      email: localStorage.getItem("email"),
    };
  }

  const [searchUserList, setSearchUserList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let getSearchListData = (value) => {
    if (searchWord.length === 0 || value.length === 0) {
      setSearchWord(value);
    }
    if (value !== "") {
      NoteServices.searchUserList({ searchWord: value })
        .then((response) => {
          setSearchUserList(response.data.data.details);
        })
        .catch((error) => console.log(error));
    }
  };

  let collaboratorUserIds = props.noteCollaborators.map((user) => user.userId);

  const searchList = (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {searchUserList.length > 0 ? (
        searchUserList
          .filter((user) => !collaboratorUserIds.includes(user.userId))
          .map((user, index) => {
            return (
              <MenuItem
                onClick={() => {
                  props.addCollaborator(user);
                  handleClose();
                }}
                key={index}
              >
                <div>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={user.email}
                  />
                </div>
              </MenuItem>
            );
          })
      ) : (
        <MenuItem>
          <ListItemText primary="No results found" />
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Dialog
      open={props.collaboratorPopup}
      onClose={props.closeCollaboratorPopup}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogTitle id="simple-dialog-title" className="dashboard--edit--labels">
        Collaborators
      </DialogTitle>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>{userDetails.firstName[0]}</Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText
              primary={`${userDetails.firstName} ${userDetails.lastName} (Owner) `}
              secondary={userDetails.email}
            />
          </div>
        </ListItem>
        {props.noteCollaborators.map((collaborator, index) => {
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{collaborator.firstName[0]}</Avatar>
              </ListItemAvatar>
              <div>
                <ListItemText
                  primary={`${collaborator.firstName} ${collaborator.lastName}`}
                  secondary={collaborator.email}
                />
              </div>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => props.removeCollaborator(collaborator.userId)}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <InputBase
            placeholder="Search Collaborator"
            margin="normal"
            fullWidth
            onChange={(e) => getSearchListData(e.currentTarget.value)}
            onClick={searchWord.length > 0 ? handleClick : null}
          />
          {searchList}
        </ListItem>
      </List>
      <DialogActions>
        <Button onClick={() => props.closeCollaboratorPopup()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Collaborator;
