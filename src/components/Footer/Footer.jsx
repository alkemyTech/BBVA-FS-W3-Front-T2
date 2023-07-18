import "./Footer.css";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
    </footer>
  );
};

export default Footer;
