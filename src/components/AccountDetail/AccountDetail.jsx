import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function AccountDetail({ account, text }) {
  return (
    <Paper sx={{ margin: "1rem" }}>
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
      <Stack spacing={2} direction="row" sx={{ padding: "1rem" }}>
        <Button variant="outlined" component={NavLink} to="/depositar">Depositar</Button>
        <Button variant="outlined" component={NavLink} to="/transferir">Transferir</Button>
      </Stack>
    </Paper>
  );
}
