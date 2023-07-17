import React from "react";
import "./Footer.css";
import { Grid, List, ListItem, Typography, Box } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import { WidthFull } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container justifyContent="space-around" spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center">
            <ComputerIcon style={{ marginRight: "8px" }} fontSize="small" />
            <Typography variant="overline" fontWeight="bold">
              © 2023 AlkyWall
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="overline" fontStyle="italic">
            Creada por <strong>los interestelares</strong>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
