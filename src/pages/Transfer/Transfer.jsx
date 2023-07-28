import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Alert,
  List,
  ListItem,
} from "@mui/material";
import { useFormik } from "formik";
import "./Transfer.css";
import * as yup from "yup";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useState } from "react";
import { sendARS, sendUSD } from "../../services/transferService";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const Transfer = () => {
  const [errorsState, setErrorsState] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const inputValidation = yup.object().shape({
    currency: yup.string().required("Campo requerido."),
    amount: yup
      .string()
      .test("number", "Debes ingresar un número positivo.", (value) => {
        return /^[0-9]+([.,]{1}[0-9]*)?$/.test(value);
      })
      .test("maxDecimals", "El número debe tener 2 decimales.", (value) => {
        const decimalRegex = /^[0-9]+([.,][0-9]{2})?$/;
        const invalidDecimalRegex = /^[0-9]+[.,]$/;
        return decimalRegex.test(value) && !invalidDecimalRegex.test(value);
      })
      .required("Campo requerido."),
    cbu: yup.string().required("Campo requerido."),
  });

  const {
    values,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: {
      cbu: "",
      amount: "",
      currency: "",
    },
    validationSchema: inputValidation,
    onSubmit: (values) => {
      if (values.amount && typeof values.amount === "string") {
        values.amount = values.amount.replace(/,/, ".");
        values.amount = parseFloat(values.amount);
      }
      setOpenDialog(true);
    },
  });

  const sendUsdConnection = () => {
    sendUSD(values)
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        navigate("/");
        enqueueSnackbar("Transferencia realizado", { variant: "success" });
      })
      .catch((err) => {
        setError(String(err));
      });
  };

  const sendArsConnection = () => {
    sendARS(values)
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        navigate("/");
        enqueueSnackbar("Transferencia realizado", { variant: "success" });
      })
      .catch((err) => {
        setError(String(err));
      });
  };
  return (
    <main>
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">
            <b>Transferir dinero</b>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <form onSubmit={handleSubmit}>
            <Paper id="transaction-paper">
              <div>
                <Typography variant="caption" display="block">
                  Seleccioná la moneda:
                </Typography>
                <FormControl>
                  <ButtonGroup
                    size="large"
                    name="currency"
                    variant="outlined"
                    className={
                      errors.currency && touched.currency && "error-input"
                    }
                  >
                    <Button
                      key="ARS"
                      value={values.currency}
                      onClick={() => setFieldValue("currency", "ARS")}
                      variant={
                        values.currency === "ARS" ? "contained" : "outlined"
                      }
                    >
                      ARS
                    </Button>
                    <Button
                      key="USD"
                      value={values.currency}
                      onClick={() => setFieldValue("currency", "USD")}
                      variant={
                        values.currency === "USD" ? "contained" : "outlined"
                      }
                    >
                      USD
                    </Button>
                  </ButtonGroup>
                  {errors.currency && touched.currency && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.currency}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div style={{ display: "flex" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="input-cbu">CBU</InputLabel>
                  <OutlinedInput
                    id="input-cbu"
                    error={!!errors.cbu && touched.cbu}
                    name="cbu"
                    value={values.cbu}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                    label="CBU"
                  />
                  {errors.amount && touched.amount && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.amount}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <br />
              <div style={{ display: "flex" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="input-amount">Total</InputLabel>
                  <OutlinedInput
                    id="input-amount"
                    error={!!errors.amount && touched.amount}
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Total"
                  />
                  {errors.amount && touched.amount && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.amount}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </Paper>
            <div style={{ textAlign: "center" }}>
              <Button variant="contained" type="submit">
                {loading ? "Cargando ..." : "Aceptar"}
              </Button>
            </div>

            {error && (
              <Alert severity="error" sx={{ marginTop: "1em" }}>
                {typeof error === "string"
                  ? error
                  : "Hubo un problema con la transacción ¡Intente más tarde!"}
              </Alert>
            )}
          </form>
        </Grid>
        <Grid item>
          <CustomDialog
            open={openDialog}
            title={"¿Confirmar la transferencia?"}
            onClose={() => {
              setOpenDialog(false);
            }}
            onConfirm={() => {
              values.currency === "ARS"
                ? sendArsConnection(values)
                : sendUsdConnection(values);
              setOpenDialog(false);
            }}
            icon={<AttachMoneyIcon fontSize="large" />}
          >
            <Typography variant="overline">
              Información de su transferencia
            </Typography>
            <List>
              <ListItem>Monto: ${values.amount}</ListItem>
              <ListItem>Moneda: {values.currency}</ListItem>
              <ListItem>Fecha: {dayjs().format("YYYY-MM-DD")}</ListItem>
            </List>
          </CustomDialog>
        </Grid>
      </Grid>
    </main>
  );
};

export default Transfer;
