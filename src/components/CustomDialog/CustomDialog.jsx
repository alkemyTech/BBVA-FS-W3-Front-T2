import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import "./styles.css";

export default function CustomDialog(props) {
  const { children, ...otherProps } = props;
  const theme = useTheme();

  return (
    <Dialog open={otherProps.open} onClose={otherProps.onClose}>
      <DialogTitle
        className="dialog-title"
        style={{ color: "white", background: theme.palette.primary.light }}
>
        {otherProps.icon}
        <Typography variant="button" component="div">
          <strong>{otherProps.title}</strong>
        </Typography>
      </DialogTitle>
      <DialogContent style={{ paddingTop: "1em" }}>{children}</DialogContent>
      <DialogActions
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          onClick={otherProps.onConfirm}
          color="primary"
          variant="contained"
        >
          Confirmar
        </Button>
        <Button onClick={otherProps.onClose} color="error" variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
