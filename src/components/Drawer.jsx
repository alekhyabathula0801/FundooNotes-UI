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
  const sideBarLabels = [
    "Notes",
    "Reminders",
    ...props.labels,
    "Edit labels",
    "Archive",
    "Bin",
  ];
  return (
    <div className={classes.sideBar}>
      <div>
        <List>
          {sideBarLabels.map((text, index) => (
            <Link
              className={classes.sideBarLink}
              onClick={
                index === sideBarLabels.length - 3
                  ? () => props.openEditLabelPopup()
                  : null
              }
              key={index}
              to={
                index === 0
                  ? "/dashboard"
                  : index === sideBarLabels.length - 3
                  ? `${window.location.pathname}`
                  : index > sideBarLabels.length - 3 || index === 1
                  ? `/dashboard/${text}`
                  : `/dashboard/label/${text}`
              }
            >
              <ListItem
                button
                key={index}
                onClick={
                  index !== sideBarLabels.length - 3
                    ? () => props.setHeading(text)
                    : null
                }
                className={
                  props.heading === text
                    ? classes.sideBarLabelSelected
                    : classes.sideBarLabel
                }
              >
                <Tooltip title={text} placement="bottom-end">
                  <ListItemIcon className={classes.sideBarIcon}>
                    {index === 0 ? (
                      <EmojiObjectsOutlined />
                    ) : index === 1 ? (
                      <NotificationsOutlined />
                    ) : index === sideBarLabels.length - 3 ? (
                      <CreateOutlined />
                    ) : index === sideBarLabels.length - 2 ? (
                      <ArchiveOutlined />
                    ) : index === sideBarLabels.length - 1 ? (
                      <DeleteOutlined />
                    ) : (
                      <LabelOutlinedIcon />
                    )}
                  </ListItemIcon>
                </Tooltip>
                <ListItem className={classes.sideBarLabelText}>{text}</ListItem>
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
