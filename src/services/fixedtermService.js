import axios from "axios";

export const fixedterm = async (values) => {
    const jwt = localStorage.getItem("jwt");
    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    };

    try {
        const response = await axios.post(
            "http://localhost:8080/fixedTerm",
            values,
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