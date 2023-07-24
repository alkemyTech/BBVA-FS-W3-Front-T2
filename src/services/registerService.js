const baseURL = 'http://localhost:8080/auth';

// Función para crear un usuario
export const createUser = async (data) => {

     const response = await fetch(`${baseURL}/register`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
    return await response.json();
}