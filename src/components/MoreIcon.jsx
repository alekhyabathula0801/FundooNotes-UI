import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function MoreIcon(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const moreList = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => props.deleteNote(true)}>Delete note</MenuItem>
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
