import axios from "axios";
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const history = useNavigate();

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized access, redirecting to login");
        history.push("/login");
      } else if (status === 404) {
        console.error("Requested resource not found");
      } else if (status === 500) {
        console.error("Internal server error");
      } else {
        console.error(`HTTP error occurred: ${status}`);
      }
    } else if (error.request) {
      console.error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      console.error("Error setting up the request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
