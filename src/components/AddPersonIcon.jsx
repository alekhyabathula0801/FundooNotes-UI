import React from "react";
import { IconButton } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function AddPersonIcon(props) {
  return (
    <Tooltip title="Collaborator" placement="bottom">
      <IconButton className={props.buttonClassName}>
        <PersonAddOutlinedIcon className={props.iconClassName} />
      </IconButton>
    </Tooltip>
  );
}

export default AddPersonIcon;
