import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = "430f04a0-ee02-4911-9b7b-b7f63cc076ff";

    config.headers["Cookie"] = `JSESSIONID=${authToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
