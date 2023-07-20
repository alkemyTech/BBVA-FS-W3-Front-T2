import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import {
  Box,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import UserData from "../../components/UserData/UserData";

import "./styles.css";
import UserDataForm from "../../forms/UserDataForm/UserDataForm";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="page-container">
      <Box
        maxWidth="900px"
        width="100%" 
        display="flex"
        flexDirection="column"
        alignItems="center"
        mx="auto" 
        p={2} 
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          
        >
          <Typography variant="h6">
            {isEditing ? "Editar datos" : "Mis datos personales"}
          </Typography>
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
          <Box width="100%">
            <UserData>
              <ListItem>
                <ListItemText primary="Nombre" secondary={user.user.firstName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Apellido" secondary={user.user.lastName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={user.user.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Edad" secondary="25" />
              </ListItem>
            </UserData>
          </Box>
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <UserDataForm />
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
}
