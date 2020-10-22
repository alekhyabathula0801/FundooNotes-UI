import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import "../css/login.css";
function Login() {
  return (
    <div className="fundoo--login">
      <Typography className="logo" variant="h4" gutterBottom>
        <span className="logo__f">F</span>
        <span className="logo__u">u</span>
        <span className="logo__n">n</span>
        <span className="logo__d">d</span>
        <span className="logo__o1">o</span>
        <span className="logo__o2">o</span>
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sign in
      </Typography>
      <Typography variant="h6" gutterBottom>
        Use your Fundoo Account
      </Typography>
      <form autoComplete="off">
        <TextField label="Email" variant="outlined" fullWidth={true} />
        <TextField label="Password" variant="outlined" fullWidth={true} />
        <div>
          <a href="#">Create account</a>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="button-block"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
