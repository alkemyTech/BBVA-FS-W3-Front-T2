import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#55ACEE",
    },
    secondary: {
      main: "#E8E8E8",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
        </BrowserRouter>
      </ThemeProvider>
    
  </React.StrictMode>
);
