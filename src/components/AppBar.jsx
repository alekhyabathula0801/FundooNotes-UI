import React, { useState } from "react";
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

function Header(props) {
  let userDetails = [];
  if (localStorage.getItem("fundoo-notes") !== null) {
    userDetails = JSON.parse(localStorage.getItem("fundoo-notes")).data;
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      width: "4.5rem",
      height: "4.5rem",
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
        <InputBase
          placeholder="Search"
          fullWidth
          onChange={(e) => props.setSearchValue(e.currentTarget.value)}
        />
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
            alt={userDetails.firstName[0]}
            src={userDetails.imageUrl !== "" ? userDetails.imageUrl : null}
          ></Avatar>
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
            ></Avatar>
            <ListItemText
              className={classes.profileMenuUserDetails}
              primary={`${userDetails.firstName} ${userDetails.lastName}`}
              secondary={userDetails.email}
            />
            <Button> Sign Out </Button>
          </List>
        </Popover>
      </div>
    </header>
  );
}

export default Header;
