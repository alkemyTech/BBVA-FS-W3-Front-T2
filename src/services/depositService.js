import axios from "axios";

export const deposit = async (values) => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/transactions/deposit",
      values,
      config
    );
    return response.data;
  } catch (error) {
    // Manejar el error específico según la respuesta del servidor
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error al procesar la solicitud de depósito.");
    }
  }
};
