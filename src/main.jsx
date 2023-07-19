import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
