import "./Footer.css";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Instagram, LinkedIn } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer
      className="footer"
      style={{ backgroundColor: theme.palette.secondary.main }}
    >
      <Grid container justifyContent="space-around" spacing={2}>
        <Grid item xs={12} sm={5}>
          <Box>
            <img
              src="../../../public/assets/iAzul.png"
              alt="Logo alkywall."
              style={{ height: "1em", display: "block" }}
            />
            <Typography variant="overline" fontWeight="bold">
              © 2023 Alkemy
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "-0.2em" }}>
            <Link
              to="https://www.alkemy.org/"
              target="_blank"
              className="icono-redes"
            >
              <HomeIcon fontSize="small" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/alkemy"
              target="_blank"
              className="icono-redes"
            >
              <LinkedIn fontSize="small" />
            </Link>
            <Link
              to="https://www.instagram.com/alkemy__/?hl=es"
              target="_blank"
              className="icono-redes"
            >
              <Instagram fontSize="small" />
            </Link>
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
    </footer>
  );
};

export default Footer;
