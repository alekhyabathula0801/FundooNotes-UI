import React, { useState, useEffect } from "react";
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
import "../css/dashboard.css";

function EditLabelsPopup(props) {
  const [createLabel, setCreateLabel] = useState(true);
  const [newLabel, setNewLabel] = useState("");
  const [updateLabel, setUpdateLabel] = useState("");
  const [labelDetails, setLabelDetails] = useState(props.labelDetails);

  useEffect(() => {
    setLabelDetails(props.labelDetails);
  }, [props.labelDetails]);

  return (
    <Dialog
      open={props.openEditLabelPopup}
      onClose={props.closeEditLabelPopup}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="simple-dialog-title" className="dashboard--edit--labels">
        Edit labels
      </DialogTitle>
      <List>
        <ListItem className="dashboard__edit__labels__list__item" key={0}>
          {createLabel ? (
            <Tooltip title="cancel" placement="bottom">
              <IconButton onClick={() => setCreateLabel(false)}>
                <CloseOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Create label" placement="bottom">
              <IconButton onClick={() => setCreateLabel(true)}>
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
          <InputBase
            placeholder="Create New Labels"
            defaultValue={newLabel}
            onChange={(e) => setNewLabel(e.currentTarget.value)}
            onClick={!createLabel ? () => setCreateLabel(true) : null}
          />
          {createLabel ? (
            <Tooltip title="Create label" placement="bottom">
              <IconButton
                onClick={() => {
                  props.addLabel(newLabel);
                  setNewLabel("");
                }}
              >
                <DoneIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </ListItem>
        {labelDetails.map((label, index) => {
          return (
            <ListItem
              className="dashboard__edit__labels__list__item"
              key={index + 1}
            >
              <Tooltip title="Delete label" placement="bottom">
                <IconButton
                  onClick={() => {
                    props.deleteLabel(label.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <InputBase
                placeholder="Rename Labels"
                defaultValue={label.label}
                onChange={(e) => setUpdateLabel(e.currentTarget.value)}
              />
              <Tooltip title="Rename label" placement="bottom">
                <IconButton
                  onClick={() => {
                    props.updateLabel(updateLabel, label.id);
                    setUpdateLabel("");
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
      <Button onClick={() => props.closeEditLabelPopup()}>Close</Button>
    </Dialog>
  );
}

export default EditLabelsPopup;
