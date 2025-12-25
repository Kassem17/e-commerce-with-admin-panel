import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single request
});

// we had made this in order to avoid reapeating the code : to write the api_url in each call

export default axiosInstance;
