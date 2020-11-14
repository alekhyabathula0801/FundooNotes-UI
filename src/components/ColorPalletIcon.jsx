import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

function ColorPalletIcon(props) {
  const useStyles = makeStyles(() => ({
    colorBox: {
      width: "145px",
      height: "110px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "4px",
    },
    colorOption: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      border: "1px solid grey",
      margin: "0.02rem 0.1rem",
    },
  }));

  const classes = useStyles();

  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "#e6c9a8",
    "#e8eaed",
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayColorPallet = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      getContentAnchorEl={null}
    >
      <MenuItem className={classes.colorBox}>
        {colors.map((color, index) => {
          return (
            <IconButton
              key={index}
              style={{ backgroundColor: color }}
              className={classes.colorOption}
              onClick={() => {
                props.setColor(color);
                handleClose();
              }}
            ></IconButton>
          );
        })}
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {displayColorPallet}
      <Tooltip title="Change colour" placement="bottom">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={props.buttonClassName}
        >
          <PaletteOutlinedIcon className={props.iconClassName} />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default ColorPalletIcon;
