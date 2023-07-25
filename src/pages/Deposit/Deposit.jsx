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
} from "@mui/material";
import { useFormik } from "formik";
import "./Deposit.css";
import * as yup from "yup";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { deposit } from "../../services/depositService";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Deposit = () => {
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
      currency: "",
      amount: "",
    },
    validationSchema: inputValidation,
    onSubmit: (values) => {
      //amount a formato correcto. Antes era String.
      if (values.amount && typeof values.amount === "string") {
        values.amount = values.amount.replace(/,/, ".");
        values.amount = parseFloat(values.amount);
      }

      //el diálogo conecta con el back
      setOpenDialog(true);
    },
  });

  const depositConnection = () => {
    deposit(values)
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        navigate("/");
        enqueueSnackbar("Depósito realizado", { variant: "success" });
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
            <b>Depositar dinero</b>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
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
            title={"¿Confirmar el depósito?"}
            message={`Pediste realizar un depósito de $${values.amount} a tu cuenta en ${values.currency}.`}
            onClose={() => {
              setOpenDialog(false);
            }}
            onConfirm={() => {
              depositConnection(values);
              setOpenDialog(false);
            }}
            icon={<AttachMoneyIcon fontSize="large" />}
          ></CustomDialog>
        </Grid>
      </Grid>
    </main>
  );
};

export default Deposit;
