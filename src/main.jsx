import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "./redux/store.js";

import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#082145",
    },
    secondary: {
      main: "#F0F0F0",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
