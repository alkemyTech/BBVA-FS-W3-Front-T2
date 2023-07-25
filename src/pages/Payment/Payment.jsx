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
  List,
  ListItem,
} from "@mui/material";
import { Formik } from "formik";
import "./Payment.css";
import * as yup from "yup";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const Payment = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const parseFloatFromString = (string) => {
    if (typeof string === "string") {
      let number = string.replace(/,/, ".");
      return parseFloat(number);
    }
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
      .max(100, "La descripción no debe tener más que 100 carácteres")
      .nullable(),
  });

  return (
    <main>
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
                        rows={4}
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
                  console.log(values);
                  setOpenDialog(false);
                  navigate("/");
                  enqueueSnackbar("Pago realizado", { variant: "success" });
                }}
                icon={<AttachMoneyIcon fontSize="large" />}
              >
                <Typography variant="overline">
                  Información de su pago
                </Typography>
                <List>
                  <ListItem>Monto: ${values.amount}</ListItem>
                  <ListItem>Moneda: {values.currency}</ListItem>
                  <ListItem>
                    Descripción:{" "}
                    {values.description || "No ingresaste una descripción"}
                  </ListItem>
                  <ListItem>Fecha: {dayjs().format("YYYY-MM-DD")}</ListItem>
                </List>
              </CustomDialog>
            </Grid>
          </Grid>
        )}
      </Formik>
    </main>
  );
};

export default Payment;
