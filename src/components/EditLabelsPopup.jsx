import React, { useState, useEffect, useContext } from "react";
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
import MessageContext from "./MessageContext";

function EditLabelsPopup(props) {
  const message = useContext(MessageContext);
  const [createLabel, setCreateLabel] = useState(true);
  const [newLabel, setNewLabel] = useState("");
  const [labelDetails, setLabelDetails] = useState(props.labelDetails);

  useEffect(() => {
    setLabelDetails(props.labelDetails);
  }, [props.labelDetails]);

  let addLabel = () => {
    if (!props.labels.includes(newLabel) && newLabel !== "") {
      props.addLabel(newLabel);
    } else {
      if (newLabel !== "") message.setMessage("Label already exists");
      else message.setMessage("Label cannot be empty");
      message.setSnackBar(true);
    }
    setNewLabel("");
  };

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
              <IconButton
                onClick={() => {
                  setCreateLabel(true);
                  setNewLabel("");
                }}
              >
                <AddOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
          <InputBase
            placeholder="Create New Labels"
            value={newLabel}
            onChange={(e) => setNewLabel(e.currentTarget.value)}
            onClick={!createLabel ? () => setCreateLabel(true) : null}
          />
          {createLabel ? (
            <Tooltip title="Create label" placement="bottom">
              <IconButton onClick={() => addLabel()}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </ListItem>
        {labelDetails.map((label, index) => {
          return (
            <UpdateLabel
              key={index}
              label={label}
              deleteLabel={props.deleteLabel}
              updateLabel={props.updateLabel}
              labels={props.labels}
            />
          );
        })}
      </List>
      <Button onClick={() => props.closeEditLabelPopup()}>Close</Button>
    </Dialog>
  );
}

function UpdateLabel(props) {
  const message = useContext(MessageContext);
  const [updateLabel, setUpdateLabel] = useState(props.label.label);
  useEffect(() => {
    setUpdateLabel(props.label.label);
  }, [props.label]);

  let updateLabels = () => {
    if (!props.labels.includes(updateLabel) && updateLabel !== "") {
      props.updateLabel(updateLabel, props.label.id);
    } else {
      if (updateLabel !== "") message.setMessage("Label already exists");
      else message.setMessage("Label cannot be empty");
      message.setSnackBar(true);
      setUpdateLabel(props.label.label);
    }
  };

  return (
    <ListItem className="dashboard__edit__labels__list__item">
      <Tooltip title="Delete label" placement="bottom">
        <IconButton
          onClick={() => {
            props.deleteLabel(props.label.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        placeholder="Rename Labels"
        value={updateLabel}
        onChange={(e) => {
          setUpdateLabel(e.currentTarget.value);
        }}
      />
      <Tooltip title="Rename label" placement="bottom">
        <IconButton onClick={() => updateLabels()}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}

export default EditLabelsPopup;
