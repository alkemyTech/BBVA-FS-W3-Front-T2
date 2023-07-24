import { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import CustomDialog from "../../CustomDialog/CustomDialog";
import InfoIcon from "@mui/icons-material/Info";
import { updateUser } from "../../../redux/reducers/userSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDataForm = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isAnyFieldCompleted, setAnyFieldCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isAnyFieldCompleted) {
      setDialogOpen(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const resetFormValues = (values) => {
    values.firstName = "";
    values.lastName = "";
    values.password = "";
  };

  const handleConfirm = (values) => {
    const updatedValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    };
    dispatch(updateUser(updatedValues)).then((result) => {
      console.log(result.payload);
      if (result.payload) {
        setDialogOpen(false);
        resetFormValues(values);
        enqueueSnackbar("Usuario actualizado", { variant: "success" });
        navigate("/");
      }
    });
  };

  const validate = (values) => {
    const regEx = /^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]*$/;
    const errors = {};

    if (values.firstName && !regEx.test(values.firstName)) {
      errors.firstName = "Solo se permiten letras del alfabeto";
    }

    if (values.lastName && !regEx.test(values.lastName)) {
      errors.lastName = "Solo se permiten letras del alfabeto";
    }

    if (values.password && values.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setAnyFieldCompleted(
      !!values.firstName || !!values.lastName || !!values.password
    );

    return errors;
  };

  const getMessage = (values) => {
    const completedFields = [];

    if (values.firstName) {
      completedFields.push("nombre");
    }

    if (values.lastName) {
      completedFields.push("apellido");
    }

    if (values.password) {
      completedFields.push("contraseña");
    }

    const message =
      completedFields.length === 1
        ? `¿Confirmás el campo ${completedFields.join(", ")}?`
        : `¿Confirmás los campos ${completedFields.join(", ")}?`;
    return message;
  };

  return (
    <Formik
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        password: "",
      }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ values, errors }) => (
        <Form>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "1rem",
            }}
          >
            <Field
              name="firstName"
              as={TextField}
              label="Nombre"
              margin="normal"
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <Field
              name="lastName"
              as={TextField}
              label="Apellido"
              margin="normal"
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <Field
              name="password"
              as={TextField}
              label="Contraseña"
              type="password"
              margin="normal"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Enviar
            </Button>
            {hasError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Debés completar al menos un campo.
              </Typography>
            )}
            {isDialogOpen && (
              <CustomDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                icon={<InfoIcon color="primary" fontSize="large" />}
                onConfirm={() => handleConfirm(values)}
                title="Actualizar datos"
                message={getMessage(values)}
              />
            )}
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default UserDataForm;
