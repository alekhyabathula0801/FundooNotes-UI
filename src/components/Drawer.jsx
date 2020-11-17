import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CreateOutlined from "@material-ui/icons/CreateOutlined";
import NotificationsOutlined from "@material-ui/icons/NotificationsOutlined";
import EmojiObjectsOutlined from "@material-ui/icons/EmojiObjectsOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

function SideBar(props) {
  const useStyles = makeStyles((theme) => ({
    sideBar: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflow: "auto",
      width: props.showDrawerLabels ? "22%" : "5%",
      [theme.breakpoints.down(960)]: {
        width: props.showDrawerLabels ? "35%" : "10%",
      },
      [theme.breakpoints.down(650)]: {
        width: "12%",
        display: props.showDrawerLabels ? "flex" : "none",
      },
      [theme.breakpoints.down(480)]: {
        width: "18%",
      },
      [theme.breakpoints.down(360)]: {
        width: "20%",
      },
    },
    sideBarLink: {
      color: "rgba(0,0,0,0.8)",
    },
    sideBarLabel: {
      borderRadius: "0 25px 25px 0",
    },
    sideBarLabelSelected: {
      borderRadius: "0 25px 25px 0",
      backgroundColor: "#feefc3",
      "&:hover": {
        backgroundColor: "#feefc3",
      },
      "& $sideBarIcon": {
        color: "rgba(0,0,0,0.8)",
      },
    },
    sideBarIcon: {
      margin: "0.3rem 0",
      [theme.breakpoints.down(960)]: {
        minWidth: "30px",
      },
    },
    drawerLicence: {
      padding: "1rem 0 1rem 0.8rem",
      textAlign: "left",
      display: props.showDrawerLabels ? "block" : "none",
      [theme.breakpoints.down(650)]: {
        display: "none",
      },
    },
    sideBarLabelText: {
      display: props.showDrawerLabels ? "block" : "none",
      padding: "0",
      fontWeight: "500",
      [theme.breakpoints.down(650)]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  let labels = [];
  props.labels.forEach((label, index) => {
    labels[index] = {
      title: label,
      action: "label",
    };
  });
  const sideBarLabels = [
    {
      title: "Notes",
      action: "notes",
    },
    {
      title: "Reminders",
      action: "reminders",
    },
    ...labels,
    {
      title: "Edit labels",
      action: "editLabels",
    },
    {
      title: "Archive",
      action: "archive",
    },
    {
      title: "Bin",
      action: "bin",
    },
  ];

  const getListIcon = (icon) => {
    switch (icon) {
      case "notes":
        return <EmojiObjectsOutlined />;
      case "reminders":
        return <NotificationsOutlined />;
      case "editLabels":
        return <CreateOutlined />;
      case "archive":
        return <ArchiveOutlined />;
      case "bin":
        return <DeleteOutlined />;
      default:
        return <LabelOutlinedIcon />;
    }
  };
  return (
    <div className={classes.sideBar}>
      <div>
        <List>
          {sideBarLabels.map((sideBarLabel, index) => (
            <Link
              className={classes.sideBarLink}
              onClick={
                sideBarLabel.action === "editLabels"
                  ? () => props.openEditLabelPopup()
                  : () => props.setHeading(sideBarLabel)
              }
              key={index}
              to={
                sideBarLabel.action === "notes"
                  ? "/dashboard"
                  : sideBarLabel.action === "editLabels"
                  ? `${window.location.pathname}`
                  : sideBarLabel.action !== "label"
                  ? `/dashboard/${sideBarLabel.title}`
                  : `/dashboard/label/${sideBarLabel.title}`
              }
            >
              <ListItem
                button
                key={index}
                className={
                  props.heading.title === sideBarLabel.title &&
                  props.heading.action === sideBarLabel.action
                    ? classes.sideBarLabelSelected
                    : classes.sideBarLabel
                }
              >
                <Tooltip title={sideBarLabel.title} placement="bottom-end">
                  <ListItemIcon className={classes.sideBarIcon}>
                    {getListIcon(sideBarLabel.action)}
                  </ListItemIcon>
                </Tooltip>
                <ListItem className={classes.sideBarLabelText}>
                  {sideBarLabel.title}
                </ListItem>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
      <div className={classes.drawerLicence}>Open-source licences</div>
    </div>
  );
}

export default SideBar;
