import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function MoreIcon(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayLabel, setDisplayLabel] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDisplayLabel(false);
  };

  const noteLabels = props.noteLabels.map((label) => {
    return label.label;
  });

  const labelsList = Object.values(props.labelDetails).map((label, index) => {
    return (
      <ListItem key={index} dense button>
        <ListItemIcon>
          <Checkbox
            edge="start"
            color="primary"
            checked={noteLabels.includes(label.label)}
            onChange={
              noteLabels.includes(label.label)
                ? () => props.removeLabelFromNote(label.id)
                : () => props.addLabelFromNote(label.id)
            }
          />
        </ListItemIcon>
        <ListItemText primary={label.label} />
      </ListItem>
    );
  });

  const moreList = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {displayLabel ? (
        <MenuList>
          {labelsList}
          <MenuItem
            onClick={() => {
              props.getAllNotes();
            }}
          >
            Save
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem onClick={() => props.deleteNote(true)}>
            Delete note
          </MenuItem>
          <MenuItem onClick={() => setDisplayLabel(true)}>Add label</MenuItem>
        </MenuList>
      )}
    </Menu>
  );

  return (
    <>
      <Tooltip title="More" placement="bottom">
        <IconButton
          className={props.buttonClassName}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertOutlinedIcon className={props.iconClassName} />
        </IconButton>
      </Tooltip>
      {moreList}
    </>
  );
}

export default MoreIcon;
