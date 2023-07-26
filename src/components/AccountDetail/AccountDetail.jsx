import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export default function AccountDetail({ account, text }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Paper sx={{ marginY: "1rem" }}>
        <Box sx={{ padding: "1rem" }}>
      <Typography variant="body1" component="h2" color="secondary.dark">
        {text}
      </Typography>
      <Typography variant="h6" component="p" marginBottom="1rem">
        <b>
          {account.balance.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </b>
      </Typography>
      <Typography variant="body1" component="h2" color="secondary.dark">
        Tu CBU
      </Typography>
      <Typography variant="h6" component="p">
        <b>{account.cbu}</b>
      </Typography>
      </Box>
      <Divider />
      <Stack
        spacing={2}
        direction={isSmallScreen ? "column" : "row"}
        sx={{ padding: "1rem" }}
      >
        <Button variant="outlined" component={NavLink} to="/pagar">
          Pagar
        </Button>
        <Button variant="outlined" component={NavLink} to="/depositar">
          Depositar
        </Button>
        <Button variant="outlined" component={NavLink} to="/transferir">
          Transferir
        </Button>
      </Stack>
    </Paper>
  );
}
