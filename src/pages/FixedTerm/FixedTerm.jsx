import { useEffect, useState } from "react";
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
  Checkbox,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import "./FixedTerm.css";
import * as yup from "yup";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ActionDialog from "../../components/CustomDialog/CustomDialog";
import CustomDialogToTerm from "../../components/CustomDialog/CustomDialogToTerm.jsx";
import { TrendingUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  fixedterm,
  fixedtermSimulate,
} from "../../services/fixedtermService.js";
import { getBalance } from "../../services/accountService.js";
import TermsAndConditions from "./TermsAndConditions.jsx";
import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import { formatCurrencyToArs } from "../../utils/dialogUtils";

const FixedTerm = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const today = dayjs(); // fecha y hora actual
  const [finalDate, setFinalDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [fixedTermSimulation, setFixedTermSimulation] = useState({});

  useEffect(() => {
    getBalance()
      .then((res) => {
        if (res.data.accountArs && res.data.accountArs.balance !== null) {
          setBalance(res.data.accountArs.balance);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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
        return numericValue <= balance;
      })
      .required("Campo requerido."),

    totalDays: yup
      .number()
      .typeError("El formato de fecha ingresado es incorrecto")
      .min(30, "Los plazos fijos deben ser de por lo menos 30 días")
      .required("Campo requerido"),
    termsChecked: yup
      .boolean()
      .oneOf([true], "Debes aceptar los términos y condiciones"),
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
      termsChecked: false,
    },
    validationSchema: inputValidation,
    onSubmit: (values) => {
      //transformo String a number
      values.amount = parseFloat(values.amount);
      //simulo plazo fijo
      onSubmitFixedTermSimulation(values);
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

  const onSubmitFixedTerm = async (values) => {
    const response = await fixedterm(values);
    if (response.errors && response.errors.length > 0) {
      setError(response.message);
    } else {
      navigate("/");
      enqueueSnackbar("Plazo fijo realizado", { variant: "success" });
    }
  };

  const onSubmitFixedTermSimulation = async (values) => {
    const response = await fixedtermSimulate(values);
    if (response.errors && response.errors.length > 0) {
      setError(response.message);
    } else {
      setFixedTermSimulation(response.fixedTermDeposit);
    }
  };

  if (loading) {
    return <Loader />;
  } else if (balance) {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5" fontWeight={"bold"}>
            Plazo fijo
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          {error.length > 0 && (
            <Alert severity="error" sx={{ marginTop: "1em", width: "300px" }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Paper id="deposit-paper">
              <Box>
                <Typography variant="button" sx={{ fontWeight: "bold" }}>
                  Balance actual:{"   "}
                  {formatCurrencyToArs(balance)}
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
                  <MobileDatePicker
                    value={finalDate}
                    onChange={handleDateChange}
                    disablePast
                    format="DD/MM/YYYY"
                    sx={() =>
                      errors.totalDays &&
                      touched.totalDays && {
                        border: "1px solid red",
                        borderRadius: "5px",
                      }
                    }
                  />
                  {errors.totalDays && touched.totalDays && (
                    <FormHelperText sx={{ color: "#f44336" }}>
                      {errors.totalDays}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "left",
                    }}
                  >
                    <Checkbox
                      name="termsChecked"
                      onChange={handleChange}
                      checked={values.termsChecked}
                    />
                    <Typography variant="body2">
                      Acepto los{" "}
                      <span
                        onClick={() => setOpenTermsModal(true)}
                        className="plazo-fijo-link"
                      >
                        términos y condiciones.
                      </span>
                    </Typography>
                  </div>
                  <FormHelperText sx={{ color: "#f44336" }}>
                    {touched.termsChecked &&
                      values.termsChecked !== true &&
                      errors.termsChecked}
                  </FormHelperText>
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

        <CustomDialogToTerm
          open={openTermsModal}
          title={"Términos y condiciones"}
          onClose={() => {
            setOpenTermsModal(false);
          }}
          onConfirm={() => {
            values.termsChecked = true;
            setOpenTermsModal(false);
          }}
        >
          <TermsAndConditions />
        </CustomDialogToTerm>

        <ActionDialog
          open={openDialog}
          title={"¿Solicitar el plazo fijo?"}
          onClose={() => {
            setOpenDialog(false);
          }}
          onConfirm={() => {
            onSubmitFixedTerm(values);
            setOpenDialog(false);
          }}
          icon={<TrendingUp fontSize="large" sx={{ marginRight: "8px" }} />}
        >
          <Typography variant="button">
            <strong>Información de su depósito</strong>
          </Typography>
          <Typography variant="body2">
            <strong>Monto invertido: </strong>
            {fixedTermSimulation?.amount?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}{" "}
            (ARS)
          </Typography>
          <Typography variant="body2">
            <strong>Monto ganado: </strong>
            {fixedTermSimulation?.interest?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Typography>
          <Typography variant="body2">
            <strong>Monto restante en cuenta: </strong>
            {(balance - fixedTermSimulation?.amount)?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Typography>
          <Typography variant="body2">
            <strong>Fecha de retiro: </strong>
            {dayjs(fixedTermSimulation.closingDate).format("DD-MM-YYYY")}
          </Typography>
        </ActionDialog>
      </Grid>
    );
  } else if (!balance && !error) {
    return (
      <Alert severity="info">
        No tenés una cuenta en ARS ¡No podés pedir un plazo fijo!
      </Alert>
    );
  } else {
    return (
      <Alert severity="error">No estás logueado, ¡Volvé a ingresar!</Alert>
    );
  }
};

export default FixedTerm;
