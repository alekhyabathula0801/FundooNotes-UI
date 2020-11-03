import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import "../css/dashboard.css";

function Collaborator(props) {
  let userDetails = [];
  if (localStorage.getItem("fundoo-notes") !== null) {
    userDetails = JSON.parse(localStorage.getItem("fundoo-notes")).data;
  }
  return (
    <Dialog
      open={props.collaboratorPopup}
      onClose={props.closeCollaboratorPopup}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="simple-dialog-title" className="dashboard--edit--labels">
        Collaborators
      </DialogTitle>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>{}</Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText
              primary={`${userDetails.firstName} ${userDetails.lastName} (Owner) `}
            />
            <ListItemText primary={userDetails.email} />
          </div>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default Collaborator;
