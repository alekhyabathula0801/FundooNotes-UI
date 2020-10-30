import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import MessageContext from "../components/MessageContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SnackBar(props) {
  const messages = useContext(MessageContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    messages.setSnackBar(false);
  };
  return (
    <Snackbar open={props.show} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.type}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
