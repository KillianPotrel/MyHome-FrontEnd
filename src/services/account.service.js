import { JWT_KEY } from "./key.js";
let getToken = () => {
  return localStorage.getItem(JWT_KEY);
};

let saveToken = (token) => {
  localStorage.setItem(JWT_KEY, token);
};

let logout = () => {
  localStorage.removeItem(JWT_KEY);
};

let isLogged = () => {
  let token = localStorage.getItem(JWT_KEY);
  return !!token;
};

export const accountService = {
  getToken,
  saveToken,
  logout,
  isLogged,
};
