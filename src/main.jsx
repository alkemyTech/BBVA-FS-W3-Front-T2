import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { esES } from "@mui/x-date-pickers/locales";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

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
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            localeText={
              esES.components.MuiLocalizationProvider.defaultProps.localeText
            }
            dateAdapter={AdapterDayjs}
            adapterLocale="es"
          >
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
          </LocalizationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
