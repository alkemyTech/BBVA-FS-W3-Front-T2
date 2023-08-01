import axios from "axios";

export const sendARS = async (values) => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const host = "http://localhost:8080/transactions";
  try {
    delete values.currency;
    const response = await axios.post(host + "/sendArs", values, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error al procesar la solicitud de depósito.");
    }
  }
};

export const sendUSD = async (values) => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const host = "http://localhost:8080/transactions";
  try {
    delete values.currency;
    const response = await axios.post(host + "/sendUsd", values, config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error al procesar la solicitud de depósito.");
    }
  }
};
