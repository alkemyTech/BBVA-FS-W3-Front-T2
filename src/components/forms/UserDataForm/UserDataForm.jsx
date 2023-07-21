import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import CustomDialog from "../../CustomDialog/CustomDialog.jsx";
import InfoIcon from "@mui/icons-material/Info";

const UserDataForm = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isAnyFieldCompleted, setAnyFieldCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = () => {
    if (isAnyFieldCompleted) {
      setDialogOpen(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handleConfirm = (values) => {
    // Acá se va a implementar la lógica para enviar los datos al back.
    // values va a contener los campos nombre, apellido y contraseña ingresados por el usuario.
    // La idea también es incluir un alert para el usuario.
    console.log(values);
    setDialogOpen(false);
  };

  const validate = (values) => {
    const regEx = /^[A-Za-zÁÉÍÓÚáéíóúüÜñÑ\s]*$/;
    const errors = {};

    if (values.nombre && !regEx.test(values.nombre)) {
      errors.nombre = "Solo se permiten letras del alfabeto";
    }

    if (values.apellido && !regEx.test(values.apellido)) {
      errors.apellido = "Solo se permiten letras del alfabeto";
    }

    if (values.contraseña && values.contraseña.length < 6) {
      errors.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }

    setAnyFieldCompleted(
      !!values.nombre || !!values.apellido || !!values.contraseña
    );

    return errors;
  };

  const getMessage = (values) => {
    const completedFields = [];

    if (values.nombre) {
      completedFields.push("nombre");
    }

    if (values.apellido) {
      completedFields.push("apellido");
    }

    if (values.contraseña) {
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
      initialValues={{ nombre: "", apellido: "", contraseña: "" }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ values, errors }) => (
        <Form>
          <Box display="flex" flexDirection="column">
            <Field
              name="nombre"
              as={TextField}
              label="Nombre"
              value={values.nombre}
              margin="normal"
              variant="outlined"
              error={!!errors.nombre}
              helperText={errors.nombre}
            />

            <Field
              name="apellido"
              as={TextField}
              label="Apellido"
              value={values.apellido}
              margin="normal"
              variant="outlined"
              error={!!errors.apellido}
              helperText={errors.apellido}
            />

            <Field
              name="contraseña"
              as={TextField}
              label="Contraseña"
              type="password"
              value={values.contraseña}
              margin="normal"
              variant="outlined"
              error={!!errors.contraseña}
              helperText={errors.contraseña}
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
              <Typography variant="body2" color="error">
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserDataForm;
