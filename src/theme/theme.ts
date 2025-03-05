"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#00FFFF",
      dark: "#00008B",
    },
    secondary: {
      main: "#7FFFD4",
      dark: "#008B8B",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
