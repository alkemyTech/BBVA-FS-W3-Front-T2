import { Formik } from 'formik'
import { TextField, Button, Typography, Card } from '@mui/material';
import * as Yup from "yup"
import "./form.css";


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
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleSubmit, handleChange, errors, touched, handleBlur }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="form-container"
                        >
                            <Typography sx={{ mb:4}} component="h1" variant="h5">
                                Iniciar Sesión
                            </Typography>
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
                            <Button type='submit' variant="contained">
                                Iniciar Sesión
                            </Button>
                        </form>
                    )
                }
            </Formik>
        </Card>
  )
}

export default LoginForm