const baseURL = 'http://localhost:8080/auth';

// Función para crear un usuario
export const registerUser = async (values) => {
    const data = {
        firstName: values.nombre,
        lastName:  values.apellido,
        password: values.password,
        email: values.email
    }
    return createUser(registerUser, data);
}
const createUser = async (url, data) => {
    return await fetch(`${baseURL}/register`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
}