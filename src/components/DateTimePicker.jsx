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

  let getMonth = (month) => {
    if (month > 9) return parseInt(month) + 1;
    return `0${parseInt(month) + 1}`;
  };

  let getDate = (date) => {
    if (date < 10) return `0${date}`;
    return date;
  };

  let d = `${today.getFullYear()}-${getMonth(today.getMonth())}-${getDate(
    today.getDate()
  )}T${today.getHours() + 2}:00`;

  if (today.getHours() > 21)
    d = `${today.getFullYear()}-${getMonth(today.getMonth())}-${getDate(
      today.getDate()
    )}T${today.getHours()}:00`;

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
