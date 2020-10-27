import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import ViewAgendaOutlined from "@material-ui/icons/ViewAgendaOutlined";
import logo from "../assets/logo.svg";
import Tooltip from "@material-ui/core/Tooltip";

function Header(props) {
  const useStyles = makeStyles(() => ({
    appBar: {
      display: "inline-flex",
      justifyContent: "space-between",
      width: "100%",
      background: "white",
      borderBottomStyle: "inset",
      alignItems: "center",
      padding: "0.3rem 0",
    },

    appBarLeft: {
      display: "flex",
      alignItems: "center",
      width: "5%",
      color: "#5f6368",
      ["@media(max-width:1000px)"]: {
        width: "25%",
      },
      ["@media(max-width:450px)"]: {
        width: "15%",
      },
    },

    menuIcon: {
      marginLeft: "0.5rem",
    },

    appBarLogo: {
      ["@media(max-width:700px)"]: {
        display: "none",
      },
    },

    appBarHeading: {
      ["@media(max-width:450px)"]: {
        display: "none",
      },
    },

    appBarMiddle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "50%",
      backgroundColor: "#f1f3f4",
      borderRadius: "0.7rem",
      border: "1px solid #f1f3f4",
      padding: "0 0.2rem",
    },

    appBarRight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "10%",
      padding: "0 0.8rem",
      columnGap: "1rem",
      ["@media(max-width:800px)"]: {
        columnGap: "0.2rem",
        padding: "0 0.5rem",
        width: "15%",
      },
      ["@media(max-width:400px)"]: {
        columnGap: "0.2rem",
        padding: "0 0.5rem",
        width: "20%",
      },
    },

    appBarRightIconButton: {
      ["@media(max-width:800px)"]: {
        padding: "0.3rem",
      },
    },
  }));

  const classes = useStyles();

  return (
    <header className={classes.appBar}>
      <div className={classes.appBarLeft}>
        <Tooltip title="Main Menu" placement="bottom">
          <IconButton
            className={classes.menuIcon}
            onClick={() => {
              props.setShowDrawerLabels();
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <IconButton className={classes.appBarLogo}>
          <img src={logo} alt="logo" width="35rem" />
        </IconButton>
        <Typography variant="h6" className={classes.appBarHeading}>
          Fundoo
        </Typography>
      </div>
      <div className={classes.appBarMiddle}>
        <Tooltip title="Search" placement="bottom">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <InputBase placeholder="Search" fullWidth />
      </div>
      <div className={classes.appBarRight}>
        <Tooltip title="List View" placement="bottom">
          <IconButton className={classes.appBarRightIconButton}>
            <ViewAgendaOutlined className={classes.rightIcon} />
          </IconButton>
        </Tooltip>
        <IconButton className={classes.appBarRightIconButton}>
          <AccountCircleOutlined className={classes.rightIcon} />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
