import React from "react";
import "./Footer.css";
import { Grid, List, ListItem, Typography, Box } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import { WidthFull } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container justifyContent="space-around" spacing={2}>
        <Grid item xs={12} sm={5}>
          <Box>
            <img
              src="../../../public/assets/iAzul.png"
              alt="Logo alkywall."
              style={{ height: "1em", display: "block" }}
            />
            <Typography variant="overline" fontWeight="bold">
              © 2023 AlkyWall
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <div id={"alineacion-derecha-footer"}>
            <Typography variant="overline" fontStyle="italic">
              Creada por <strong>los interestelares</strong>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
