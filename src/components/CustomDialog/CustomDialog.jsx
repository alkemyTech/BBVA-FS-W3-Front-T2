import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import "./styles.css";

export default function CustomDialog(props) {
  const { children, ...otherProps } = props;
  return (
    <Dialog open={otherProps.open} onClose={otherProps.onClose}>
      <DialogTitle className="dialog-title">
        {otherProps.icon}
        <Typography variant="h6" component="div">
          {otherProps.title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
          <Button onClick={otherProps.onConfirm} color="primary" variant="contained">
              Confirmar
          </Button>
        <Button onClick={otherProps.onClose} color="error" variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}