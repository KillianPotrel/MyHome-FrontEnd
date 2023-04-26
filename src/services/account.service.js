import { JWT_KEY } from "./key.js";
import { FAMILY_KEY } from "./key.js";
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

let getFamily = () => {
  return localStorage.getItem(FAMILY_KEY);
};

let saveFamily = (id) => {
  localStorage.setItem(FAMILY_KEY, id);
};

let disconnectFamily = () => {
  localStorage.removeItem(FAMILY_KEY);
};

let isFamilyConnect = () => {
  let family_id = localStorage.getItem(FAMILY_KEY);
  return !!family_id;
};

export const accountService = {
  getToken,
  saveToken,
  logout,
  isLogged,
  getFamily,
  saveFamily,
  isFamilyConnect,
  disconnectFamily,
};
