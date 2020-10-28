import React from "react";
import { IconButton } from "@material-ui/core";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function AddImageIcon(props) {
  return (
    <Tooltip title="Add image" placement="bottom">
      <IconButton className={props.buttonClassName}>
        <CropOriginalOutlinedIcon className={props.iconClassName} />
      </IconButton>
    </Tooltip>
  );
}

export default AddImageIcon;
