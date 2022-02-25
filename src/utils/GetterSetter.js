import jwt from "jsonwebtoken";
import { storageDecryptedData } from "./dataSecurity";

// Verify if token has expired
export const isToken = (data) => {
  const token = storageDecryptedData(data);

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.REACT_APP_TOKEN);
      const expiresAt = decodedToken.exp * 1000;
      const currentTime = new Date();
      if (currentTime > expiresAt) {
        removeStorageData();
        return false;
      } else if (currentTime <= expiresAt) return true;
    } catch (err) {
      removeStorageData();
      return false;
    }
  } else {
    removeStorageData();
    return false;
  }
};

// Get data from localstorage
export const getStorageData = (data) => {
  return localStorage.getItem(data) ? localStorage.getItem(data) : null;
};

// Remove data from localstorage
export const removeStorageData = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USERDATA);
};

// Constants
export const TOKEN = "adminjwt";
export const USERDATA = "adminuserData";
