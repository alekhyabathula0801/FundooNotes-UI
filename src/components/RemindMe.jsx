import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import DateAndTimePicker from "./DateTimePicker";

function RemindMeIcon(props) {
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
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      getContentAnchorEl={null}
    >
      <MenuItem>
        <DateAndTimePicker
          setReminder={props.setReminder}
          closeMenu={handleClose}
        />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Tooltip title="Remind Me" placement="bottom">
        <IconButton
          className={props.buttonClassName}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AddAlertOutlinedIcon className={props.iconClassName} />
        </IconButton>
      </Tooltip>
      {moreList}
    </>
  );
}

export default RemindMeIcon;
