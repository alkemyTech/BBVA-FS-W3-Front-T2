import { useState } from "react";
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from '@mui/icons-material/Cancel';
import UserData from "../../components/UserData/UserData";

import "./styles.css";
import UserDataForm from "../../forms/UserDataForm/UserDataForm";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    // Cambia el estado para mostrar el formulario de edición
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Cambia el estado para ocultar el formulario de edición
    setIsEditing(false);
  };

  const user = {
    nombre: "Juan",
    apellido: "Perez",
    email: "juanperez@gmail.com",
    edad: 25,
  };
  return (
    <div className="page-container">
    <Box width="900px" display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Typography variant="h6">Mis datos personales</Typography>
        {isEditing ? (
          <IconButton color="primary" onClick={handleCancel}>
            <CancelIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      {!isEditing ? (
        <div style={{ width: "100%", height: "100%" }}>
          <UserData>
            <ListItem>
              <ListItemText primary="Nombre" secondary={user.nombre} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Apellido" secondary={user.apellido} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Edad" secondary={user.edad} />
            </ListItem>
          </UserData>
        </div>
      ) : (
        <UserDataForm />
      )}
    </Box>
  </div>
  );
}
