import { Formik } from "formik";
import { TextField, Button, Typography, Card, Box } from "@mui/material";
import * as Yup from "yup";
import "./form.css";
import { createUser } from "../../services/registerService.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
  const [errorsState, setErrorsState] = useState({});
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    setErrorsState({});
    const response = await createUser(values);
    if (response.errors.length > 0) {
      if (
        response.errors.some((error) => error.toLowerCase().includes("email"))
      ) {
        setErrorsState({ email: response.message });
      }
    } else {
      navigate("/login");
    }
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
      .required("Password requerido"),
  });

  return (
    <Card>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          age: 0,
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
                helperText={
                  errors.firstName && touched.firstName && errors.firstName
                }
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
                helperText={
                  errors.lastName && touched.lastName && errors.lastName
                }
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
                helperText={errors.age && touched.age && errors.age}
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
                error={!!errors.email || !!errorsState.email}
                helperText={errors.email || errorsState.email}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                required
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                InputLabelProps={{
                  shrink: true,
                }}
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
