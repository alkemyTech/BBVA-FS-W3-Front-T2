import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/reducers/userSlice";

export default function NavBar({ navLinks }) {
  const [open, setOpen] = useState(false);
  // El valor de auth está hardcodeado, se debe obtener del backend
  // Los links de navegación se mostrarán solamente si el usuario está autenticado
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
    navigate("/");
  };

  // El nombre del usuario está hardcoeado, se debe obtener del backend
  const userName = "Rodrigo Juarez";

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {auth && (
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton onClick={() => setOpen(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <img
              src="/assets/iBlanco.png"
              alt="ALKYWALL Logo"
              style={{ width: "150px", display: "block" }}
            />
          </Box>
          {auth && (
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {navLinks.map((navlink) => (
                <Button
                  key={navlink.title}
                  color="inherit"
                  component={NavLink}
                  to={navlink.path}
                >
                  {navlink.title}
                </Button>
              ))}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography variant="body1" sx={{ mr: 1 }}>
                  {userName}
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  to="/mi-perfil"
                  component={NavLink}
                  onClick={handleClose}
                >
                  Perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} setOpen={setOpen}/>
      </Drawer>
    </>
  );
}
