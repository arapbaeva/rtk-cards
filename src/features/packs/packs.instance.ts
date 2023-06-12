import axios from "axios";

export const PacksInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "cards/",
  withCredentials: true,
});
