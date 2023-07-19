import { Formik } from 'formik'
import { TextField, Button, Box, Typography, Paper, Card } from '@mui/material';
import * as Yup from "yup"


const LoginForm = () => {

    const onSubmit = async (values) => {
        console.log(values)
        //logica de login
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no valido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Minimo 6 caracteres").required("Password requerido")
    })

  return (
        <Card>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleSubmit, handleChange, errors, touched, handleBlur }) => (
                        <Box
                            onSubmit={handleSubmit}
                            sx={{ display: "flex", flexDirection: "column",alignItems: "center", mt:3, p:4 }}
                            component="form"
                            >
                            <TextField
                            sx={{ mb:3 }}
                                required
                                id="outlined-required"
                                label="Email"
                                type="email"
                                placeholder='Email'
                                value={values.email}
                                onChange={handleChange}
                                name='email'
                                onBlur={handleBlur}
                                error={errors.email && touched.email}
                                helperText={errors.email && touched.email && errors.email}
                            />
                            <TextField
                                sx={{ mb:3 }}
                                required
                                id="password"
                                label="Password"
                                type="password"
                                placeholder='Password'
                                value={values.password}
                                onChange={handleChange}
                                name='password'
                                onBlur={handleBlur}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password && errors.password}
                            />
                            {

                            }
                            <Button type='submit' variant="contained">
                                Iniciar Sesión
                            </Button>
                        </Box>
                    )
                }
            </Formik>
        </Card>
  )
}

export default LoginForm