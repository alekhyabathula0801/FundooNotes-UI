import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
// import LabelOutlined from "@material-ui/icons/LabelOutlined";
import CreateOutlined from "@material-ui/icons/CreateOutlined";
import NotificationsOutlined from "@material-ui/icons/NotificationsOutlined";
import EmojiObjectsOutlined from "@material-ui/icons/EmojiObjectsOutlined";

const useStyles = makeStyles(() => ({
  sideBarOpen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "17.5%",
  },
  miniSideBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "5%",
  },
  label: {
    borderRadius: "0 25px 25px 0",
  },
  sideBarIcon: {
    margin: "0.3rem 0",
  },
  drawerLicence: {
    padding: "1rem 0 1rem 0.8rem",
    textAlign: "left",
  },
  showSideBarLabels: {
    display: "block",
  },
  hideSideBarLabels: {
    display: "none",
  },
}));

function SideBar(props) {
  const classes = useStyles();
  return (
    <div
      className={
        props.showDrawerLabels
          ? `${classes.sideBarOpen}`
          : `${classes.miniSideBar}`
      }
    >
      <div>
        <List>
          {["Notes", "Reminders", "Edit labels", "Archive", "Bin"].map(
            (text, index) => (
              <ListItem button key={index} className={classes.label}>
                <ListItemIcon className={classes.sideBarIcon}>
                  {index === 0 ? (
                    <EmojiObjectsOutlined />
                  ) : index === 1 ? (
                    <NotificationsOutlined />
                  ) : index === 2 ? (
                    <CreateOutlined />
                  ) : index === 3 ? (
                    <ArchiveOutlined />
                  ) : (
                    <DeleteOutlined />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  className={
                    !props.showDrawerLabels
                      ? `${classes.hideSideBarLabels}`
                      : `${classes.showSideBarLabels}`
                  }
                />
              </ListItem>
            )
          )}
        </List>
      </div>
      <div
        className={
          props.showDrawerLabels
            ? `${classes.drawerLicence}`
            : `${classes.hideSideBarLabels}`
        }
      >
        Open-source licences
      </div>
    </div>
  );
}

export default SideBar;
