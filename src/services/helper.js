import axios from "axios";
import { getCurrentUserToken } from "../auth/authentication";

export const BASE_URL = "https://demo-deployment-0-1-updesh.onrender.com";
// export const BASE_URL = "http://localhost:9090";

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
