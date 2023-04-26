import axios from "axios";

const BASE_URL = process.env.NEXT_APP_BASE_URL;

axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";

export const base = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": process.env.NEXT_APP_ALLOW_ORIGIN,
  },
});

export const auth = axios.create({
  baseURL: BASE_URL,
});

auth.interceptors.request.use(config => {
  // const access_token = localStorage.getItem("access_token");
  // if (!access_token) {
  //   config.headers["Authorization"] = null;
  // } else {
  //   config.headers["Authorization"] = access_token;
  // }

  return config;
});

auth.interceptors.response.use(response => {
  // if (response.headers["Authorization"]) {
  //   localStorage.setItem("access_token", response.headers["Authorization"]);
  // }
  return response;
});
