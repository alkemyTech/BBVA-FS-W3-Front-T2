import axios from "axios";

export const sendARS = async (values) => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const host = "http://localhost:8080/transactions";
  console.log(config);
  try {
    delete values.currency;
    const response = await axios.post(host + "/send_ars", values, config);
    console.log(response);
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
  console.log(config);
  try {
    delete values.currency;
    const response = await axios.post(host + "/send_usd", values, config);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error al procesar la solicitud de depósito.");
    }
  }
};
