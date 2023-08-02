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
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import "./Payment.css";
import * as yup from "yup";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useState, useEffect } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { payment } from "../../services/paymentService";
import { getBalance } from "../../services/accountService";
import Loader from "../../components/Loader/Loader";
import { getTodaysDate, formatCurrencyToArs } from "../../utils/dialogUtils";

const Payment = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [accountsExist, setAccountsExist] = useState(false);

  useEffect(() => {
    getBalance((response) => response)
      .then((response) => {
        if (response.data.accountArs || response.data.accountUsd)
          setAccountsExist(true);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const parseFloatFromString = (string) => {
    if (typeof string === "string") {
      let number = string.replace(/,/, ".");
      return parseFloat(number);
    }
    return string;
  };

  const inputValidation = yup.object().shape({
    currency: yup.string().required("Campo requerido."),
    amount: yup
      .string()
      .test("number", "Debes ingresar un número.", (value) => {
        return /^[0-9]+([.,]{1}[0-9]*)?$/.test(value);
      })
      .test(
        "positiveNumber",
        "Debes ingresar un número mayor a 0.",
        (value) => {
          const numericValue = parseFloatFromString(value);
          return numericValue > 0;
        }
      )
      .test("maxDecimals", "El número debe tener 2 decimales.", (value) => {
        const decimalRegex = /^[0-9]+([.,][0-9]{2})?$/;
        const invalidDecimalRegex = /^[0-9]+[.,]$/;

        return decimalRegex.test(value) && !invalidDecimalRegex.test(value);
      })
      .required("Campo requerido."),
    description: yup
      .string()
      .max(50, "La descripción no debe tener más que 50 carácteres")
      .nullable(),
  });

  const paymentConnection = (values) => {
    payment(values)
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        navigate("/");
        enqueueSnackbar("Pago realizado", { variant: "success" });
      })
      .catch((err) => {
        setError(String(err));
      });
  };
  if (loading) {
    return <Loader />;
  } else if (accountsExist) {
    return (
      <Formik
        initialValues={{
          currency: "",
          amount: "",
          description: "",
        }}
        validationSchema={inputValidation}
        onSubmit={(values) => {
          values.amount = parseFloatFromString(values.amount);
          setOpenDialog(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h5">
                <b>Realizar pago</b>
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSubmit}>
                <Paper id="deposit-paper">
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
                  <div>
                    <FormControl fullWidth>
                      <Typography variant="caption" display="block">
                        Ingresá tu descripción (opcional):
                      </Typography>
                      <TextField
                        id="textarea-description"
                        multiline
                        rows={2}
                        variant="outlined"
                        InputProps={{
                          inputProps: {
                            style: { fontSize: "13px" },
                          },
                          inputComponent: "textarea",
                        }}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.description && touched.description}
                      />
                      {errors.description && touched.description && (
                        <FormHelperText
                          sx={{ color: "#f44336", maxWidth: "200px" }}
                        >
                          {errors.description}
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
              </form>
              {error && (
                <Alert
                  severity="error"
                  sx={{ marginTop: "1em", width: "300px" }}
                >
                  {typeof error === "string"
                    ? error
                    : "Hubo un problema con la transacción ¡Intente más tarde!"}
                </Alert>
              )}
            </Grid>
            <Grid item>
              <CustomDialog
                open={openDialog}
                title={"¿Confirmar el pago?"}
                onClose={() => {
                  setOpenDialog(false);
                }}
                onConfirm={() => {
                  setOpenDialog(false);
                  paymentConnection(values);
                }}
                icon={<AttachMoneyIcon fontSize="large" />}
              >
                <Typography variant="button">
                  <strong>Información de su pago</strong>
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "0.5em" }}>
                  <strong>Monto: </strong>
                  {formatCurrencyToArs(values.amount)}
                </Typography>
                <Typography variant="body2">
                  <strong>Moneda: </strong>
                  {values.currency}
                </Typography>
                <Typography variant="body2">
                  <strong>Descripción: </strong>
                  {values.description || "No ingresaste una descripción"}
                </Typography>
                <Typography variant="body2">
                  <strong>Fecha:</strong> {getTodaysDate()}
                </Typography>
              </CustomDialog>
            </Grid>
          </Grid>
        )}
      </Formik>
    );
  } else if (error) {
    return (
      <Alert severity="error">No estás logueado, ¡Volvé a ingresar!</Alert>
    );
  } else {
    return <Alert severity="info">No tenés cuentas activas</Alert>;
  }
};

export default Payment;
