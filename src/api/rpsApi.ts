import axios from "axios";

export const rpsApi = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API}`,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});