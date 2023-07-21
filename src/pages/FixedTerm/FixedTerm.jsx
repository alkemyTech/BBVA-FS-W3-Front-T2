import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import { useTheme } from "@emotion/react";
import "./FixedTerm.css";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ActionDialog from "../../components/CustomDialog/CustomDialog";
import { TrendingUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FixedTerm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState({
    balanceActual: 20000,
    balanceFinal: undefined,
  });

  const today = dayjs(); // fecha y hora actual
  const [finalDate, setFinalDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const inputValidation = yup.object().shape({
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
      .test("minAmount", "El mínimo de inversión es de $500.", (value) => {
        const numericValue = parseFloat(value.replace(",", "."));
        return numericValue >= 500;
      })
      .test("maxAmount", "El monto excede al balance disponible.", (value) => {
        const numericValue = parseFloat(value.replace(",", "."));
        return numericValue <= user.balanceActual;
      })
      .required("Campo requerido."),

    totalDays: yup
      .number()
      .typeError("El formato de fecha ingresado es incorrecto")
      .min(30, "Los plazos fijos deben ser de por lo menos 30 días")
      .required("Campo requerido"),
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
      amount: "",
      totalDays: null,
    },
    validationSchema: inputValidation,
    onSubmit: (values) => {
      //transformo String a number
      values.amount = parseFloat(values.amount);
      //abro el dialog de confirmación
      setOpenDialog(true);
    },
  });

  const handleDateChange = (date) => {
    setFinalDate(date);
    if (date) {
      const timeDifference =
        date.startOf("day").toDate() - today.startOf("day").toDate();
      const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setFieldValue("totalDays", totalDays);
    }
  };

  return (
    <main>
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" fontWeight={"bold"}>
            Plazo fijo
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <form onSubmit={handleSubmit}>
            <Paper
              id="deposit-paper"
            >
              <Box>
                <Typography variant="button" sx={{ fontWeight: "bold" }}>
                  Balance actual: ${user.balanceActual}
                </Typography>
                <Typography variant="overline" display={"block"}>
                  Dinero invertido
                </Typography>
                <FormControl fullWidth>
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
                  />
                  {errors.amount && touched.amount && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.amount}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box>
                <Typography variant="overline" display={"block"}>
                  Día final
                </Typography>
                <FormControl fullWidth>
                  <DatePicker
                    value={finalDate}
                    onChange={handleDateChange}
                    disablePast
                    format="DD/MM/YYYY"
                    sx={() =>
                      errors.totalDays &&
                      values.totalDays !== null && {
                        border: "1px solid red",
                        borderRadius: "5px",
                      }
                    }
                  />
                  {errors.totalDays && values.totalDays !== null && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.totalDays}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Paper>
            <Box sx={{ textAlign: "center" }}>
              <Button variant="contained" type="submit">
                Simular
              </Button>
            </Box>
          </form>
        </Grid>

        <ActionDialog
          open={openDialog}
          title={"¿Solicitar el plazo fijo?"}
          message={`Invertiste $${values.amount} por ${values.totalDays} días.  
          El monto ganado al finalizar el plazo es de $${Math.floor(
            values.amount * (1 + 0.02) - values.amount
          )} 
          y monto del dinero restante en su cuenta es de $${
            user.balanceActual - values.amount
          }`}
          onClose={() => {
            setOpenDialog(false);
          }}
          onConfirm={() => {
            setOpenDialog(false);
            navigate("/")
          }}
          icon={<TrendingUp fontSize="large"  sx={{ marginRight: "8px" }} />}
        ></ActionDialog>
      </Grid>
    </main>
  );
};

export default FixedTerm;
