import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";
import "../css/dashboard.css";
import NoteServices from "../services/NoteServices";

function Collaborator(props) {
  let userDetails = [];
  if (localStorage.getItem("fundoo-notes") !== null) {
    userDetails = JSON.parse(localStorage.getItem("fundoo-notes")).data;
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

  const searchList = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {searchUserList.length > 0 ? (
        searchUserList.map((user) => {
          return (
            <MenuItem>
              <div>
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                <ListItemText primary={user.email} />
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
            <Avatar></Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText
              primary={`${userDetails.firstName} ${userDetails.lastName} (Owner) `}
            />
            <ListItemText primary={userDetails.email} />
          </div>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <TextField
            label="Search Collaborator"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => getSearchListData(e.currentTarget.value)}
            onClick={searchWord.length > 0 ? handleClick : null}
          />
          {searchList}
        </ListItem>
      </List>
    </Dialog>
  );
}

export default Collaborator;
