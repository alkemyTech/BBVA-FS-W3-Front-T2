import { Formik } from "formik";
import { TextField, Button, Typography, Card, Box, Stack, Slide } from "@mui/material";
import * as Yup from "yup";
import "./form.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/userSlice";
import { NavLink } from "react-router-dom";
import React from "react";

const LoginForm = () => {
  const containerRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state);
  const onSubmit = async (values) => {
    let userCredentials = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        navigate("/");
      }
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Password requerido"),
  });

  return (
    <Card>
      <Formik
        initialValues={{ email: "", password: "" }}
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
            <img src="/public/assets/iAzul.png" style={{ width: "100px", display: "block" }}/>
            <Typography sx={{ mb: 2, mt: 1 }} component="h1" variant="h5">
              <b>Iniciar sesión</b>
            </Typography>
            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

<Slide direction="down" in={true} container={containerRef.current}>
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
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />
  </Slide>
  <Slide direction="down" in={true} container={containerRef.current}>
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
            />
            </Slide>
            <Stack direction="column" >
              <Typography variant="body2" marginRight={1}>¿No tenés cuenta? </Typography>
            <NavLink to="/register">
              <Typography sx={{ mb: 2 }} variant="body2">
                Registrate
              </Typography>
            </NavLink>
            </Stack>
            <Box display="flex" justifyContent="end" >
              <Button type="submit" variant="contained">
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
              
            </Box>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default LoginForm;
