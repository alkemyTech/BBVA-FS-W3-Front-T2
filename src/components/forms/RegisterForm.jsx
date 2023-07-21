import { Formik } from 'formik'
import { TextField, Button, Typography, Card } from '@mui/material';
import * as Yup from "yup"
import "./form.css";
import {registerUser} from "../../store/reducers/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);
    const onSubmit = async (values) => {
        dispatch(registerUser({...values})).then((result) => {
            if (result.payload) {
                navigate("/login");
            }
        });
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().min(2,"Nombre no valido").required("Nombre requerido"),
        apellido: Yup.string().min(2,"Apellido no valido").required("Apellido requerido"),
        edad: Yup.number().positive("La edad tiene que ser positiva") .min(18, "Debes tener minimo 18 para ingresar"),
        email: Yup.string().email("Email no valido").required("Email requerido"),
        password: Yup.string().trim().min(6, "Minimo 6 caracteres").required("Password requerido")
    })

    return (
        <Card>
            <Formik
                initialValues={{ nombre: "", apellido: "", edad: 0, email: "", password: "" }}
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
                                Registro
                            </Typography>
                            <div className="inputs-container">
                                <TextField
                                    sx={{ mb:3}}
                                    size="small"
                                    required
                                    id="outlined-required"
                                    label="Nombre"
                                    type="text"
                                    placeholder='Nombre'
                                    value={values.nombre}
                                    onChange={handleChange}
                                    name='nombre'
                                    onBlur={handleBlur}
                                    error={errors.nombre && touched.nombre}
                                    helperText={errors.nombre && touched.nombre && errors.nombre}
                                />
                                <TextField
                                    sx={{ mb:3 }}
                                    size="small"
                                    required
                                    id="outlined-required"
                                    label="Apellido"
                                    type="text"
                                    placeholder='Apellido'
                                    value={values.apellido}
                                    onChange={handleChange}
                                    name='apellido'
                                    onBlur={handleBlur}
                                    error={errors.apellido && touched.apellido}
                                    helperText={errors.apellido && touched.apellido && errors.apellido}
                                />
                                <TextField
                                    sx={{ mb:3 }}
                                    size="small"
                                    required
                                    id="outlined-required"
                                    label="Edad"
                                    type="edad"
                                    placeholder='Edad'
                                    value={values.edad}
                                    onChange={handleChange}
                                    name='edad'
                                    onBlur={handleBlur}
                                    error={errors.edad && touched.edad}
                                    helperText={errors.edad && touched.edad && errors.edad}
                                />
                                <TextField
                                    sx={{ mb:3 }}
                                    size="small"
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
                                <TextField sx={{ mb:3 }}
                                           size="small"
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
                            </div>
                            {error && (
                                <Typography variant="body2" color="error">
                                    Usuario o contraseña incorrectos.
                                </Typography>
                            )}
                            <Button type="submit" variant="contained">
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </Button>
                        </form>
                    )
                }
            </Formik>
        </Card>
    )
}



export default RegisterForm