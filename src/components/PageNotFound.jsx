import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h6>Page Doesnt Exist or Unavailable</h6>
      <Link to="/dashboard">Home</Link>
    </div>
  );
}

export default PageNotFound;
