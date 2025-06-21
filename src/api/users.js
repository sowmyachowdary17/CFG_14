import axios from "axios";
import { getToken } from "../utils/tokenUtils";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getUsers = () => api.get("/users");
export const createUser = (user) => api.post("/users", user);
export const deleteUser = (id) => api.delete(`/users/${id}`);
