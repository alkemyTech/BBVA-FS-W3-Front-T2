import axios from "axios";
import BASE_URL from "../constants/api";
import { getAuthorizationHeader } from "../constants/headers";

export const updateUser = (updatedValues, id) => {
  try {
    const authorizationHeader = getAuthorizationHeader();
    const response = axios.patch(`${BASE_URL}/users/${id}`, updatedValues, {
      headers: authorizationHeader,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
