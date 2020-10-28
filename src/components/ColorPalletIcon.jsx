import React from "react";
import { IconButton } from "@material-ui/core";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function ColorPalletIcon(props) {
  return (
    <Tooltip title="Change colour" placement="bottom">
      <IconButton className={props.buttonClassName}>
        <PaletteOutlinedIcon className={props.iconClassName} />
      </IconButton>
    </Tooltip>
  );
}

export default ColorPalletIcon;
