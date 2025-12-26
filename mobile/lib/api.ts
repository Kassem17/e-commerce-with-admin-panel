import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

// const API_URL = "http://localhost:5000/api";

const API_URL = "https://e-commerce-with-admin-panel-pi.vercel.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // cleanup : remove interceptor when component unmounts
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return api;
};

// on every single request we would like to have an auth token so that our backend knows that we're authenticated

// we are including the auth token under the auth header
