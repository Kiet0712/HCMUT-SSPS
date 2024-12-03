import axios from "axios";
// Axios Interceptor Instance
export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://103.82.133.50:4000",
  headers: {
    'Content-Type': 'application/json',
  },
});

// export default axiosInstance;