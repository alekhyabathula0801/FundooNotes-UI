import React, { useState } from "react";
import { IconButton, Menu, MenuItem, MenuList } from "@material-ui/core";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

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
      <MenuItem key={index}>
        {noteLabels.includes(label.label) ? (
          <IconButton onClick={() => props.removeLabelFromNote(label.id)}>
            <CheckBoxOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => props.addLabelFromNote(label.id)}>
            <CheckBoxOutlineBlankOutlinedIcon />
          </IconButton>
        )}
        {label.label}
      </MenuItem>
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
        labelsList
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
