import { Paper, List } from "@mui/material";

export default function UserData({ children }) {
  return (
    <Paper className="data-container">
      <List>{children}</List>
    </Paper>
  );
}
