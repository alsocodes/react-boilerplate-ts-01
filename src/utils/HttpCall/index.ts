import axios from 'axios';
import { useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import { AUTH_KEY } from '../../app/type.d';
import { RefreshLogin } from '../../slices/AuthSlice';
import { SetProgress, SetToastData } from '../../slices/ConfigSlice';

const storage = localStorage.getItem(AUTH_KEY);
const { accessToken, refreshToken } = storage
  ? JSON.parse(storage)
  : { accessToken: '', refreshToken: '' };

const axiosApiInstance = axios.create({
  baseURL: 'http://192.168.0.26:9000',
  timeout: 30000,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    store.dispatch(SetProgress(true));
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
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
    store.dispatch(SetProgress(true));
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      // const access_token = await refreshAccessToken();
      const dispatch = useAppDispatch();
      dispatch(RefreshLogin());

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
      return axiosApiInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
