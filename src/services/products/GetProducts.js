import axios from "axios";
import basePath from "../../utils/baseUrl";

export const getAllProducts = async () => {
    const response = await axios.get(basePath);
    return response?.data
}