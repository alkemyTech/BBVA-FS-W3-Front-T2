import { Formik } from 'formik'
import { TextField, Button, Paper } from '@mui/material';
import * as Yup from "yup"


const Login = () => {
    
    const onSubmit = async (values) => {
        console.log(values)
        //logica de login
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email no valido").required("Email requerido"),
        password: Yup.string().trim().min(10, "Minimo 6 caracteres").required("Password requerido")
    })

  return (
    <div>
        <Paper

        >
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >   
                {
                    ({values, handleSubmit, handleChange, errors, touched, handleBlur }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                type="email" 
                                placeholder='Username' 
                                value={values.email} 
                                onChange={handleChange}
                                name='email'
                                onBlur={handleBlur}
                            />
                            {
                                errors.email && touched.email && errors.email
                            }
                            <TextField
                                required
                                id="outlined-required"
                                label="Password" 
                                type="password" 
                                placeholder='Password'  
                                value={values.password} 
                                onChange={handleChange}
                                name='password'
                                onBlur={handleBlur}                      
                            />
                            {
                                errors.password && touched.password && errors.password
                            }
                            <Button type='submit' variant="contained">
                                login
                            </Button>                            
                        </form>  
                    )
                }
            </Formik>                                   
        </Paper>       
    </div>
  )
}

export default Login