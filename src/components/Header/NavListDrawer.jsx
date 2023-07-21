import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducers/userSlice";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle } from "@mui/icons-material";

export default function NavListDrawer({ navLinks, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
    navigate("/login");
  };

  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          <ListItem>
            <Box sx={{ flexGrow: 1 }}>
              <img
                src="/assets/iAzul.png"
                alt="ALKYWALL Logo"
                style={{ width: "150px", display: "block" }}
              />
            </Box>
          </ListItem>
          <Divider />
          <ListItemButton
            component={NavLink}
            to="/mi-perfil"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
          <Divider />
          {navLinks.map((navlink) => (
            <ListItem disablePadding key={navlink.title}>
              <ListItemButton
                component={NavLink}
                to={navlink.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{navlink.icon}</ListItemIcon>
                <ListItemText primary={navlink.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItemButton
            onClick={() => {
              handleLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </List>
      </nav>
    </Box>
  );
}
