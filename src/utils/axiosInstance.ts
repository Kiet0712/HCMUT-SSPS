import axios from "axios";
// Axios Interceptor Instance
export const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://103.82.133.50:4000",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") as string;
    const accessToken = JSON.parse(token);

    // If token is present, add it to request's Authorization Header
    if (token) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
  (response) => {
    // Can be modified response
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);
