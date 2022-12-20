import axios from "axios";
import { AUTH_KEY } from "../../app/type.d";

const storage = localStorage.getItem(AUTH_KEY);
const { accessToken, refreshToken } = storage
  ? JSON.parse(storage)
  : { accessToken: "", refreshToken: "" };

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      // const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + refreshToken;
      return axiosApiInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
