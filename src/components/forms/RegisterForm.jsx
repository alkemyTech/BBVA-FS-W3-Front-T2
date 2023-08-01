import { Formik } from "formik";
import { TextField, Button, Typography, Card, Box } from "@mui/material";
import * as Yup from "yup";
import "./form.css";
import { createUser } from "../../services/registerService.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

const RegisterForm = () => {
  const [errorsState, setErrorsState] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    createUser(values)
      .then(() => {
        enqueueSnackbar("Usuario creado", { variant: "success" });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrorsState(String(err));
      });
  };

  console.log(errorsState);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Nombre no valido")
      .required("Nombre requerido"),
    lastName: Yup.string()
      .min(2, "Apellido no valido")
      .required("Apellido requerido"),
    age: Yup.number()
      .positive("La edad tiene que ser positiva")
      .min(18, "Debes tener minimo 18 para ingresar"),
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Contraseña requerida"),
  });

  return (
    <Card sx={{ position: "relative", zIndex: "2", width: ["90%", "60%"] }}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          age: null,
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit} className="form-container">
            <img
              src="/public/assets/iAzul.png"
              style={{ width: "100px", display: "block" }}
            />
            <Typography sx={{ mb: 2, mt: 1 }} component="h1" variant="h5">
              <b>Registro</b>
            </Typography>
            <div className="inputs-container">
              <TextField
                sx={{ mb: 2 }}
                required
                id="outlined-required"
                label="Nombre"
                type="text"
                placeholder="Nombre"
                value={values.firstName}
                onChange={handleChange}
                name="firstName"
                onBlur={handleBlur}
                error={errors.firstName && touched.firstName}
                helperText={touched.firstName && errors.firstName}
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                required
                id="outlined-required"
                label="Apellido"
                type="text"
                placeholder="Apellido"
                value={values.lastName}
                onChange={handleChange}
                name="lastName"
                onBlur={handleBlur}
                error={errors.lastName && touched.lastName}
                helperText={touched.lastName && errors.lastName}
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                required
                id="outlined-required"
                label="Edad"
                type="edad"
                placeholder="Edad"
                value={values.age}
                onChange={handleChange}
                name="age"
                onBlur={handleBlur}
                error={errors.age && touched.age}
                helperText={touched.age && errors.age}
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                required
                id="outlined-required"
                label="Email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                error={(touched.email && !!errors.email) || !!errorsState}
                helperText={(touched.email && errors.email) || errorsState}
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                required
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={touched.password && errors.password}
                fullWidth
              />
            </div>
            <Box display="flex" justifyContent="end">
              <Button type="submit" variant="contained">
                Registrar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default RegisterForm;
