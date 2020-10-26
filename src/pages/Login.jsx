import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../css/login.css";
import UserService from "../services/UserService";
import Validation from "../services/Validation";
import { useHistory } from "react-router-dom";
function Login() {
  const [values, setValues] = useState({
    emailId: "",
    password: "",
    showPassword: false,
  });

  const history = useHistory();

  function handleOnChange(e) {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  function userLogin() {
    if (
      Validation.validateEmail(values.emailId) &&
      Validation.validatePassword(values.password)
    ) {
      const data = {
        email: values.emailId,
        password: values.password,
      };
      UserService.userLogin(data)
        .then((data) => {
          console.log(data);
          localStorage.setItem("fundoo-notes", JSON.stringify(data));
          history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(
        Validation.validateEmail(values.emailId) +
          " " +
          Validation.validatePassword(values.password)
      );
    }
  }

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
      <div>
        <TextField
          label="Email"
          name="emailId"
          id="outlined-basic"
          onChange={handleOnChange}
          variant="outlined"
          autoComplete="off"
          fullWidth={true}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Password"
            name="password"
            autoComplete="off"
            type={values.showPassword ? "text" : "password"}
            onChange={handleOnChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            fullWidth={true}
          />
        </FormControl>
        <div>
          <a href="http://fundoonotes.incubation.bridgelabz.com">
            Create account
          </a>
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
