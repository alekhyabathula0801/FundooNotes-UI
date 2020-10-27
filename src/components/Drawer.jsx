import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CreateOutlined from "@material-ui/icons/CreateOutlined";
import NotificationsOutlined from "@material-ui/icons/NotificationsOutlined";
import EmojiObjectsOutlined from "@material-ui/icons/EmojiObjectsOutlined";
import Tooltip from "@material-ui/core/Tooltip";

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
    sideBarLabel: {
      borderRadius: "0 25px 25px 0",
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
      [theme.breakpoints.down(650)]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.sideBar}>
      <div>
        <List>
          {["Notes", "Reminders", "Edit labels", "Archive", "Bin"].map(
            (text, index) => (
              <ListItem button key={index} className={classes.sideBarLabel}>
                <Tooltip title={text} placement="bottom-end">
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
                </Tooltip>
                <ListItemText
                  primary={text}
                  className={classes.sideBarLabelText}
                />
              </ListItem>
            )
          )}
        </List>
      </div>
      <div className={classes.drawerLicence}>Open-source licences</div>
    </div>
  );
}

export default SideBar;
