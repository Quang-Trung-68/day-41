import axios from "axios";

// https://api01.f8team.dev/api/products?page=2

const httpRequest = axios.create({
  baseURL: "https://api01.f8team.dev/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.response.use((response) => response.data);

export default httpRequest;
