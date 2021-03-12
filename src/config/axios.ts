import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const instance = axios.create({
  baseURL: BACKEND_URL,
});

export default instance;