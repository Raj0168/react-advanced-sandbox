import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LogoTitle = () => (
  <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
    <Link
      to="/"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      React Sandbox
    </Link>
  </Typography>
);

export default LogoTitle;
