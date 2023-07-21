import {
  Box,
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
} from "@mui/material";
import { useFormik } from "formik";
import { useTheme } from "@emotion/react";
import "./Transaction.css";
import * as yup from "yup";

const Deposit = () => {
  const theme = useTheme();

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
      console.log(values);
      //aca puede ir la lógica de conexión con el back
    },
  });

  return (
    <main>
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">Transferir dinero</Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <form onSubmit={handleSubmit}>
            <Paper
              id="deposit-paper"
              sx={{ backgroundColor: theme.palette.secondary.main }}
            >
              <Box>
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
              </Box>
              <Box sx={{ display: "flex" }}>
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
              </Box>
              <br />
              <Box sx={{ display: "flex" }}>
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
              </Box>
            </Paper>
            <Box sx={{ textAlign: "center" }}>
              <Button variant="contained" type="submit">
                Aceptar
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </main>
  );
};

export default Deposit;
