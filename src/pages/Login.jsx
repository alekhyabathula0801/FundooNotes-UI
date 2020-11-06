import React, { useState, useContext } from "react";
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
import MessageContext from "../components/MessageContext";

function Login() {
  const message = useContext(MessageContext);
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
          localStorage.setItem("token", data.data.id);
          localStorage.setItem("firstName", data.data.firstName);
          localStorage.setItem("lastName", data.data.lastName);
          localStorage.setItem("imageUrl", data.data.imageUrl);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("userId", data.data.userId);
          message.setMessage("You Have Logged In Sucessfully");
          message.setSnackBar(true);
          history.push("/dashboard");
        })
        .catch(() => {
          message.setMessage("Incorrect Password or email");
          message.setSnackBar(true);
        });
    } else {
      if (!Validation.validateEmail(values.emailId)) {
        message.setMessage("Please enter valid email");
        message.setSnackBar(true);
      } else if (!Validation.validatePassword(values.emailId)) {
        message.setMessage(
          "Password must contain atleast one uppercase, lowercase, digit, special character with minimum of 6 characters"
        );
        message.setSnackBar(true);
      }
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
