import axios from "axios";
import { store } from "../../app/store";
import { Logout, RefreshLogin } from "../../slices/AuthSlice";
import { SetProgress, SetToastData } from "../../slices/ConfigSlice";

const axiosApiInstance = axios.create({
  baseURL: "http://192.168.0.26:9000",
  timeout: 30000,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    store.dispatch(SetProgress(true));
    const userData = store.getState().auth.userData;
    const token =
      config.url === "/auth/refresh-login"
        ? userData?.refreshToken
        : userData?.accessToken;
    config.headers = {
      Authorization: `Bearer ${token}`,
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
    store.dispatch(SetProgress(false));
    return response;
  },
  async function (error) {
    store.dispatch(SetProgress(false));
    if (error.response.status === 401) {
      const originalRequest = error.config;
      const userData = store.getState().auth.userData;
      if (
        !originalRequest._retry &&
        userData?.refreshToken &&
        error.config.url !== "/auth/refresh-login"
      ) {
        originalRequest._retry = true;
        const { payload }: any = await store.dispatch(RefreshLogin());
        // console.log("xp", payload.accessToken);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + payload.accessToken;
        return axiosApiInstance(originalRequest);
      }
      store.dispatch(Logout());
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
