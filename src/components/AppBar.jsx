import React, { useState, useContext } from "react";
import {
  IconButton,
  Typography,
  InputBase,
  Avatar,
  ListItemText,
  Popover,
  List,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ViewAgendaOutlined from "@material-ui/icons/ViewAgendaOutlined";
import logo from "../assets/logo.svg";
import Tooltip from "@material-ui/core/Tooltip";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import { useHistory } from "react-router-dom";
import MessageContext from "../components/MessageContext";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

function Header(props) {
  const message = useContext(MessageContext);
  const history = useHistory();

  let userDetails = {};
  if (localStorage.getItem("token") !== null) {
    userDetails = {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      imageUrl: localStorage.getItem("imageUrl"),
      email: localStorage.getItem("email"),
    };
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    message.setMessage("You Have Logged Out Sucessfully");
    message.setSnackBar(true);
    history.push("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const useStyles = makeStyles((theme) => ({
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
      [theme.breakpoints.down(1000)]: {
        width: "25%",
      },
      [theme.breakpoints.down(450)]: {
        width: "15%",
      },
    },

    menuIcon: {
      marginLeft: "0.5rem",
    },

    appBarLogo: {
      padding: "0.1rem",
      marginRight: "0.4rem",
      [theme.breakpoints.down(700)]: {
        display: "none",
      },
    },

    appBarHeading: {
      [theme.breakpoints.down(450)]: {
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
      "&:focus-within": {
        backgroundColor: "#ffffff",
        boxShadow: "1px 1px 2px grey",
      },
      "&:focus-within $searchClose": {
        display: "block",
      },
    },

    searchClose: {
      display: "none",
    },

    appBarRight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "10%",
      padding: "0 0.8rem",
      columnGap: "1rem",
      [theme.breakpoints.down(800)]: {
        columnGap: "0.2rem",
        padding: "0 0.5rem",
        width: "15%",
      },
      [theme.breakpoints.down(800)]: {
        columnGap: "0.2rem",
        padding: "0 0.5rem",
        width: "20%",
      },
    },

    appBarRightIconButton: {
      padding: "0.2rem",
      [theme.breakpoints.down(800)]: {
        padding: "0.2rem",
      },
    },

    profileImage: {
      backgroundColor: "#512DA8",
    },

    profileMenuList: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: "0.5rem 0.8rem",
    },

    profileMenuUserDetails: {
      textAlign: "center",
    },

    profileMenuImage: {
      width: "4rem",
      height: "4rem",
      backgroundColor: "#512DA8",
      fontSize: "1.7rem",
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
        {props.heading === "Notes" ? (
          <>
            <IconButton className={classes.appBarLogo}>
              <img src={logo} alt="logo" width="35rem" />
            </IconButton>
            <Typography variant="h6" className={classes.appBarHeading}>
              Fundoo
            </Typography>
          </>
        ) : (
          <Typography variant="h6" className={classes.appBarHeading}>
            {props.heading}
          </Typography>
        )}
      </div>
      <div className={classes.appBarMiddle}>
        <Tooltip title="Search" placement="bottom">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <InputBase
          placeholder="Search"
          fullWidth
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.currentTarget.value)}
        />
        {props.searchValue !== "" ? (
          <Tooltip title="Clear search" placement="bottom">
            <IconButton
              className={classes.searchClose}
              onClick={() => props.setSearchValue("")}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
      <div className={classes.appBarRight}>
        {props.showListView ? (
          <Tooltip title="List View" placement="bottom">
            <IconButton
              className={classes.appBarRightIconButton}
              onClick={() => props.setListView()}
            >
              <ViewAgendaOutlined className={classes.rightIcon} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Grid View" placement="bottom">
            <IconButton
              className={classes.appBarRightIconButton}
              onClick={() => props.setListView()}
            >
              <AppsOutlinedIcon className={classes.rightIcon} />
            </IconButton>
          </Tooltip>
        )}
        <IconButton
          className={classes.appBarRightIconButton}
          onClick={handleClick}
          aria-describedby={id}
        >
          <Avatar
            className={classes.profileImage}
            alt={userDetails.firstName}
            src={userDetails.imageUrl !== "" ? userDetails.imageUrl : null}
          >
            {userDetails.imageUrl === "" ? userDetails.firstName[0] : null}
          </Avatar>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <List className={classes.profileMenuList}>
            <Avatar
              className={classes.profileMenuImage}
              alt={userDetails.firstName}
              src={userDetails.imageUrl}
            >
              {userDetails.imageUrl === "" ? userDetails.firstName[0] : null}
            </Avatar>
            <ListItemText
              className={classes.profileMenuUserDetails}
              primary={`${userDetails.firstName} ${userDetails.lastName}`}
              secondary={userDetails.email}
            />
            <Button onClick={() => logout()}> Sign Out </Button>
          </List>
        </Popover>
      </div>
    </header>
  );
}

export default Header;
