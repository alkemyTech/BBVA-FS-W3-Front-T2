import axios from "axios";

export const fixedterm = async (values) => {
  const neededValues = {
    amount: values.amount,
    totalDays: values.totalDays,
  };
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/fixedTerm",
      neededValues,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      return error.response.data;
    } else {
      throw new Error("Error al procesar la solicitud el plazo");
    }
  }
};

export const fixedtermSimulate = async (values) => {
  const neededValues = {
    amount: values.amount,
    totalDays: values.totalDays,
  };
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/fixedTerm/simulate",
      neededValues,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error al procesar la solicitud el plazo");
    }
  }
};
