import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Moment from "moment";

export default function FixedTermCard({ fixedTerm }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(2),
    textAlign: "center",
  }));

  return (
    <Grid item xs={12} md={6}>
      <Item>
        <Typography variant="subtitle1" textAlign="left" marginBottom={2}>
          <b>Plazo fijo en pesos</b>
        </Typography>
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography variant="body1" textAlign="left">
            Fecha de cierre
          </Typography>
          <Typography variant="body1" textAlign="right">
            {Moment(fixedTerm.closingDate.toString()).format("DD-MM-YYYY")}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" marginY={1}>
          <Typography variant="body1" textAlign="left">
            Capital
          </Typography>
          <Typography variant="body1" textAlign="right">
            {fixedTerm.amount.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" marginY={1}>
          <Typography variant="body1" textAlign="left">
            Intereses ganados
          </Typography>
          <Typography variant="body1" textAlign="right">
            {fixedTerm.interest.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" marginY={1}>
          <Typography variant="body1" textAlign="left">
            Monto total
          </Typography>
          <Typography variant="body1" textAlign="right">
            {(fixedTerm.amount + fixedTerm.interest).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Typography>
        </Box>
      </Item>
    </Grid>
  );
}
