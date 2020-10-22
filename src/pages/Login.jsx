import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import "../css/login.css";
function Login() {
  return (
    <div className="fundoo--login">
      <Logo></Logo>
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
