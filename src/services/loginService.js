import axios from "axios";
import BASE_URL from "../constants/api";

export const loginUser = async (userCredentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userCredentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
