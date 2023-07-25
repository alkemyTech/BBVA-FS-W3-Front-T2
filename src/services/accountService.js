import axios from "axios";
import BASE_URL from "../constants/api";
import { getAuthorizationHeader } from "../constants/headers";

export const getBalance = async () => {
  try {
    const authorizationHeader = getAuthorizationHeader();
    const response = await axios(`${BASE_URL}/accounts/balance`, {
      headers: authorizationHeader,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
