import axios from "axios";

export const transaction = async (transactionData) => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  let apiUrl;
  if (transactionData.currency === "ARS") {
    apiUrl = "http://localhost:8080/transactions/send_ars";
  } else if (transactionData.currency === "USD") {
    apiUrl = "http://localhost:8080/transactions/send_usd";
  } else {
    throw new Error("Debe seleccionar un tipo de correspondencia.");
  }

  try {
    const response = await axios.post(apiUrl, transactionData, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error al procesar la transacción.");
    }
  }
};
