import React from "react";
import { IconButton } from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function RemindMeIcon(props) {
  return (
    <Tooltip title="Remind Me" placement="bottom">
      <IconButton className={props.buttonClassName}>
        <AddAlertOutlinedIcon className={props.iconClassName} />
      </IconButton>
    </Tooltip>
  );
}

export default RemindMeIcon;
