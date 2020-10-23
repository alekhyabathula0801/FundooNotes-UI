import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Logo from "../components/Logo";
import "../css/login.css";
import UserService from "../services/user/UserService";
function Login() {
  const [values, setValues] = useState({
    emailId: "",
    password: "",
  });

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  function userLogin() {
    const data = {
      email: values.emailId,
      password: values.password,
    };
    UserService.userLogin(data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="fundoo--login">
      <Logo></Logo>
      <Typography variant="h5" gutterBottom>
        Sign in
      </Typography>
      <Typography variant="h6" gutterBottom>
        Use your Fundoo Account
      </Typography>
      <div autoComplete="off">
        <TextField
          label="Email"
          name="emailId"
          onChange={handleOnChange}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          label="Password"
          name="password"
          onChange={handleOnChange}
          variant="outlined"
          fullWidth={true}
        />
        <div>
          <a href="#">Create account</a>
          <Button
            variant="contained"
            onClick={userLogin}
            color="primary"
            type="submit"
            className="button-block"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
