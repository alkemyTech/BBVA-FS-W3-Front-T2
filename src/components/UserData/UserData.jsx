import { Paper, List, ListItem, ListItemText } from "@mui/material";

import "./styles.css";

export default function UserData({ children }) {
  return (
    <Paper className="data-container">
      <List>{children}</List>
    </Paper>
  );
}
