import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Header/NavBar";
import navLinks from "../../utils/navLinks";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Navbar navLinks={navLinks} />
      </AppBar>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
        <Box component="main" sx={{ flex: "1 0 auto", py: 3, px: 2 }}>
          <Container maxWidth="md">
            
            {children}
          </Container>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;