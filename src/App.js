import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { MessageProvider } from "./components/MessageContext";
import SnackBar from "./components/SnackBar";

function App() {
  const messagesList = {
    "You Have Logged In Sucessfully": "success",
    "Please enter valid email": "error",
    "Password must contain atleast one uppercase, lowercase, digit, special character with minimum of 6 characters":
      "error",
    "Incorrect Password or email": "error",
    "Some Error Occured while processing request": "error",
    "Note added Sucessfully": "success",
    "Title and description cannot be empty": "error",
    "Note archived Sucessfully": "success",
    "Note unArchived Sucessfully": "success",
    "Note deleted Sucessfully": "success",
    "Note restored Sucessfully": "success",
    "Note deleted forever Sucessfully": "success",
  };

  const [message, setMessage] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);

  return (
    <ThemeProvider>
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
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
        </div>
      </MessageProvider>
    </ThemeProvider>
  );
}

export default App;
