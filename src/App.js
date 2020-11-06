import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MessageProvider } from "./components/MessageContext";
import SnackBar from "./components/SnackBar";
import PrivateRoute from "./components/PrivateRouter";

function App() {
  const messagesList = {
    "You Have Logged In Sucessfully": "success",
    "You Have Logged Out Sucessfully": "success",
    "Please enter valid email": "error",
    "Password must contain atleast one uppercase, lowercase, digit, special character with minimum of 6 characters":
      "error",
    "Incorrect Password or email": "error",
    "Some Error Occured while processing request": "error",
    "Note added Sucessfully": "success",
    "Note updated Sucessfully": "success",
    "Title and description cannot be empty": "error",
    "Note archived Sucessfully": "success",
    "Note unArchived Sucessfully": "success",
    "Note deleted Sucessfully": "success",
    "Note restored Sucessfully": "success",
    "Note deleted forever Sucessfully": "success",
    "Note pinned Sucessfully": "success",
    "Note unpinned Sucessfully": "success",
    "Note reminder deleted Sucessfully": "success",
    "Note reminder updated Sucessfully": "success",
    "Note label removed Sucessfully": "success",
    "Note label added Sucessfully": "success",
    "Note Collaborator added Sucessfully": "success",
    "Note Collaborator removed Sucessfully": "success",
  };

  const [message, setMessage] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);

  return (
    <MessageProvider
      value={{
        message: message,
        setMessage: setMessage,
        showSnakBar: showSnackBar,
        setSnackBar: setShowSnackBar,
      }}
    >
      <SnackBar
        type={messagesList[message]}
        message={message}
        show={showSnackBar}
      />
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </MessageProvider>
  );
}

export default App;
