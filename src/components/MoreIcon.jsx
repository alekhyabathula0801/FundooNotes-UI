import React from "react";
import { IconButton } from "@material-ui/core";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function MoreIcon(props) {
  return (
    <Tooltip title="More" placement="bottom">
      <IconButton className={props.buttonClassName}>
        <MoreVertOutlinedIcon className={props.iconClassName} />
      </IconButton>
    </Tooltip>
  );
}

export default MoreIcon;
