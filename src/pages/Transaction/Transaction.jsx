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
import "./Transaction.css";
import * as yup from "yup";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { transaction } from "../../services/transactionService";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

const Transaction = () => {
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
    cbu: yup
      .string()
      .test(
        "isPositiveNumber",
        "Debes ingresar un número positivo.",
        (value) => {
          return /^[0-9]+$/.test(value) && parseInt(value, 10) > 0;
        }
      )
      .test(
        "isExactly22Characters",
        "El número debe tener exactamente 22 caracteres.",
        (value) => {
          return value.length === 22;
        }
      )
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

  const transactionConnection = () => {
    transaction(values)
      .then(() => {
        setLoading(true);
      })
      .then(() => {
        navigate("/");
        enqueueSnackbar("Transferencia realizada", { variant: "success" });
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
              <div style={{ display: "block" }}>
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
                <br />
                <br />
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
                    label="Total"
                  />
                  {errors.cbu && touched.cbu && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.cbu}
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
              transactionConnection(values);
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

export default Transaction;
