import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Settings from "@material-ui/icons/Settings";
import logo from "../assets/logo.svg";

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
    },

    menuIcon: {
      marginLeft: "0.5rem",
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
    },
  }));

  const classes = useStyles();
  return (
    <header className={classes.appBar}>
      <div className={classes.appBarLeft}>
        <IconButton
          className={classes.menuIcon}
          onClick={() => props.setShowDrawerLabels(!props.showDrawerLabels)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton>
          <img src={logo} alt="logo" width="35rem" />
        </IconButton>
        <Typography variant="h6">Fundoo</Typography>
      </div>
      <div className={classes.appBarMiddle}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase placeholder="Search" fullWidth />
      </div>
      <div className={classes.appBarRight}>
        <IconButton>
          <ViewAgendaIcon className={classes.rightIcon} />
        </IconButton>
        <IconButton>
          <Settings className={classes.rightIcon} />
        </IconButton>
        <IconButton>
          <AccountCircle className={classes.rightIcon} />
        </IconButton>
      </div>
    </header>
  );
}

export default Header;
