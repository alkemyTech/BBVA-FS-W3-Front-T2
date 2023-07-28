import axios from "axios";
const baseURL = "http://localhost:8080/auth";

// Función para crear un usuario
export const createUser = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/register`,
      JSON.stringify(data),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
