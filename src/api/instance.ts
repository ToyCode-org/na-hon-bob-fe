import axios from "axios";

const BASE_URL = "https://localhost:3001";

axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";

export const base = axios.create({
  baseURL: BASE_URL,
});

export const auth = axios.create({
  baseURL: BASE_URL,
});

auth.interceptors.request.use(config => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    config.headers["Authorization"] = null;
  } else {
    config.headers["Authorization"] = access_token;
  }

  return config;
});

auth.interceptors.response.use(response => {
  if (response.headers["Authorization"]) {
    localStorage.removeItem("access_token");
    localStorage.setItem("access_token", response.headers["Authorization"]);
  }
  return response;
});
