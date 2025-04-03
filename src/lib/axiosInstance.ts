import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: `https://courses-gen-next.vercel.app/api`,
  withCredentials: true,
});
