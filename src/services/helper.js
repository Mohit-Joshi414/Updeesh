import axios from "axios";
import { getCurrentUserToken } from "../auth/authentication";

export const BASE_URL = "https://demo-deployment-latest-ku5g.onrender.com";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getCurrentUserToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
  },
  (err) => Promise.reject(err)
);
