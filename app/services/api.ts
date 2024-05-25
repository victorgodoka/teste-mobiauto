import axios from "axios";

const url = "https://parallelum.com.br/fipe/api/v1/";
const api = axios.create({ baseURL: url });

export default api;