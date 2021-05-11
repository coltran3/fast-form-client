import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://fast-form-api.herokuapp.com/",
});
