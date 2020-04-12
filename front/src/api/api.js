import { apiUrl } from "@/config.js";
const axios = require("axios");
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

export function isAuthorized() {
  return api.get("/user/authorized");
}

export function login(params) {
  return api.post("/auth", params);
}

export function register(params) {
  return api.post("/register", params);
}

export function logout() {
  return api.post("/logout");
}

export function getTodos() {
  return api.get("/tasks");
}

export function addTodo(params) {
  return api.post("/tasks", params);
}

export function removeTodo(id) {
  return api.delete(`/tasks/${id}`);
}

export function updateTodo(params) {
  return api.put(`/tasks/${params.id}`, params);
}
