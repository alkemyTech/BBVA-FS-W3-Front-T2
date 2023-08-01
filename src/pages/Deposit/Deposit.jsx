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
import { useFormik } from "formik";
import "./Deposit.css";
import * as yup from "yup";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useState, useEffect } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { deposit } from "../../services/depositService";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { getBalance } from "../../services/accountService";

const Deposit = () => {
  const navigate = useNavigate();
  const [accountsExist, setAccountsExist] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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
      description: "",
    },
    validationSchema: inputValidation,
    onSubmit: (values) => {
      //amount a formato correcto. Antes era String.
      values.amount = parseFloatFromString(values.amount);

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

  if (loading) {
    return "cargando";
  } else if (accountsExist) {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">
            <b>Depositar dinero</b>
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
                    //lógica form
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
            <Alert severity="error" sx={{ marginTop: "1em", width: "300px" }}>
              {typeof error === "string"
                ? error
                : "Hubo un problema con la transacción ¡Intente más tarde!"}
            </Alert>
          )}
        </Grid>
        <Grid item>
          <CustomDialog
            open={openDialog}
            title={"¿Confirmar el depósito?"}
            onClose={() => {
              setOpenDialog(false);
            }}
            onConfirm={() => {
              depositConnection(values);
              setOpenDialog(false);
            }}
            icon={<AttachMoneyIcon fontSize="large" />}
          >
            <Typography variant="overline">
              Información de su depósito
            </Typography>
            <Typography variant="body1">Monto: ${values.amount}</Typography>
            <Typography variant="body1">Moneda: {values.currency}</Typography>
            <Typography variant="body1">
              Descripción:{" "}
              {values.description || "No ingresaste una descripción"}
            </Typography>
            <Typography variant="body1">
              Fecha: {dayjs().format("YYYY-MM-DD")}
            </Typography>
          </CustomDialog>
        </Grid>
      </Grid>
    );
  } else if (error) {
    return (
      <Alert severity="error">No estás logueado, ¡Volvé a ingresar!</Alert>
    );
  } else {
    return <Alert severity="info">No tenés cuentas activas</Alert>;
  }
};

export default Deposit;
