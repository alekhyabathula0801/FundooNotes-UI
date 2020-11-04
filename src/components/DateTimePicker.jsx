import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  textField: {
    width: "200px",
  },
}));

export default function DateAndTimePicker(props) {
  const today = new Date();
  let month = "";
  if (today.getMonth() > 9) {
    month = parseInt(today.getMonth()) + 1;
  } else {
    month = `0${parseInt(today.getMonth()) + 1}`;
  }

  let todayDate = today.getDate();
  if (todayDate < 10) todayDate = `0${todayDate}`;
  let d = `${today.getFullYear()}-${month}-${todayDate}T${
    today.getHours() + 2
  }:00`;
  if (today.getHours() > 21)
    d = `${today.getFullYear()}-${month}-${todayDate}T${today.getHours()}:00`;
  const [date, setDate] = useState(d);
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
      <TextField
        label="Reminder"
        type="datetime-local"
        defaultValue={d}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setDate(e.currentTarget.value);
        }}
      />
      <Button
        onClick={() => {
          props.setReminder(date);
          props.closeMenu();
        }}
      >
        Save
      </Button>
    </form>
  );
}
