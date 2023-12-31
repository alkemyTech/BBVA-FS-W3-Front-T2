import axios from "axios";
import BASE_URL from "../constants/api";
import { getAuthorizationHeader } from "../constants/headers";

export const updateUser = async (updatedValues, id) => {
  try {
    const authorizationHeader = getAuthorizationHeader();
    const response = await axios.patch(`${BASE_URL}/users/${id}`, updatedValues, {
      headers: authorizationHeader,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
