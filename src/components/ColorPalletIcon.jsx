import React from "react";
import { IconButton } from "@material-ui/core";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";

function ColorPalletIcon(props) {
  return (
    <IconButton className={props.buttonClassName}>
      <PaletteOutlinedIcon className={props.iconClassName} />
    </IconButton>
  );
}

export default ColorPalletIcon;
