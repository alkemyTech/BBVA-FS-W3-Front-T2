import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import CustomDialog from "../../CustomDialog/CustomDialog";
import InfoIcon from "@mui/icons-material/Info";
import { AccountCircle } from "@mui/icons-material";
import { updateUser } from "../../../redux/reducers/userSlice";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDataForm = (props) => {
  const { children, ...otherProps } = props;
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

  const getContent = (values) => {
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
    const content = (
      <>
        <Typography variant="body1">{message}</Typography>
      </>
    );
    return content;
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
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <AccountCircle fontSize="large" />
            </Box>

            {hasError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Debés completar al menos un campo.
              </Typography>
            )}
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

            {isDialogOpen && (
              <CustomDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                icon={<InfoIcon color="#FFF" fontSize="large" />}
                onConfirm={() => handleConfirm(values)}
                title="Actualizar datos"
              >
                {getContent(values)}
              </CustomDialog>
            )}
          </Paper>
          <Box display="flex" justifyContent="space-between">
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
            >
              Enviar
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="error"
              size="medium"
              sx={{ mt: 2}}
              onClick={otherProps.handleCancel}
            >
              Cancelar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserDataForm;
