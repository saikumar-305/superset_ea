import axios from "axios";
import LocalStorageService from "src/ea_oyster_components/services/localStorageService";
import history from "./history.js";

const axiosInstance = axios.create({
  baseURL: 'https://oysterapi.expressanalytics.net/',
});
const localStorageService = LocalStorageService.getService();

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    const token = localStorageService.getAccessToken();
    if (config.baseURL === process.env.REACT_APP_BACK_END_URL && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    //  response property is not there in some APIs
    if (error.response === undefined) {
      return Promise.reject(error);
    } else if (
      (error.response.status === 401 || error.response.status === 403) &&
      originalRequest._retry
    ) {
      history.push({
        pathname: "/session/signin",
      });
      return Promise.reject(error);
    } else if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const res = await axiosInstance.post("api/gw/oauth/token/refreshToken", {
        refreshToken: localStorageService.getRefreshToken(),
      });
      if (res.status === 200) {
        // 1) put token to LocalStorage
        localStorageService.setToken(res.data);

        // 2) Change Authorization header
        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + localStorageService.getAccessToken();

        // 3) return originalRequest object with Axios.
        return axiosInstance(originalRequest);
      }
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || "Something went wrong!"
//     )
// );

export default axiosInstance;
