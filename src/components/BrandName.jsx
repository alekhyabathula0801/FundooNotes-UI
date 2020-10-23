import React from "react";
import { Typography } from "@material-ui/core";
import "../css/logo.css";
function BrandName() {
  return (
    <Typography className="logo" variant="h4" gutterBottom>
      <span className="logo__f">F</span>
      <span className="logo__u">u</span>
      <span className="logo__n">n</span>
      <span className="logo__d">d</span>
      <span className="logo__o1">o</span>
      <span className="logo__o2">o</span>
    </Typography>
  );
}

export default BrandName;
