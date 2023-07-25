import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import './styles.css'

export default function CustomDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle className="dialog-title"
      >
        {props.icon}
        <Typography variant="h6" component="div">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={otherProps.onConfirm} color="primary" variant="contained">
          Confirmar
        </Button>
        <Button onClick={props.onClose} color="error" variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}