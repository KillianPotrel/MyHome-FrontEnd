import { JWT_KEY } from "./key.js";
import { FAMILY_KEY } from "./key.js";
import { URL_API } from "./key.js";
import axios from "axios";

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

let tokenExpired = () => {
  axios
    .get(URL_API + "getUserInfo", {
      params: { token: accountService.getToken(), user_id: null },
    })
    .then(() => {
      return false;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 406) {
          localStorage.removeItem(JWT_KEY);
          localStorage.removeItem(FAMILY_KEY);
          return true;
        }
      }
    });

  return false;
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

let isMe = async (id_member) => {
  let token = localStorage.getItem(JWT_KEY);

  if (token) {
    try {
      const response = await axios.get(URL_API + "getUserInfo", {
        params: { token: accountService.getToken(), user_id: null },
      });

      const userData = response.data;
      const userId = userData.id;

      return id_member === userId;
    } catch (error) {
      console.log(error);
    }
  }

  return false;
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
  isMe,
  tokenExpired,
};
