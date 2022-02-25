import crypto from "crypto";

import { getStorageData } from "./GetterSetter";

const algorithm = process.env.REACT_APP_CRYPTO_ALGORITHM;
const password = process.env.REACT_APP_CRYPT0_PASSWORD;

// Encrypt data
export const dataEncryption = (data) => {
  let password_hash = crypto
    .createHash("sha256")
    .update(password, "utf-8")
    .digest();
  let iv = Buffer.from("mBj0tzBUxDFmix1T", "base64"); // TEST ONLY SHOULD BE UNIQUE (such as random)
  let cipher = crypto.createCipheriv(algorithm, password_hash, iv);

  let encryptedData = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final(),
  ]);

  return Buffer.concat([iv, encryptedData, cipher.getAuthTag()]).toString(
    "base64"
  );
};

export const dataDecryption = (data) => {
  let password_hash = crypto
    .createHash("sha256")
    .update(password, "utf-8")
    .digest(); //**
  let combinerBuffer = Buffer.from(data, "base64"); //**
  let iv = combinerBuffer.slice(0, 12); //**
  let deciper = crypto.createDecipheriv(algorithm, password_hash, iv);
  let temp = combinerBuffer.length - 16;
  deciper.setAuthTag(combinerBuffer.slice(temp));
  return (
    deciper.update(combinerBuffer.slice(12, temp), "utf8") +
    deciper.final("utf8")
  );
};

export const storageDecryptedData = (data) => {
  const encryptedData = getStorageData(data);
  if (!encryptedData) return null;
  const decryptedData = dataDecryption(encryptedData);
  return decryptedData;
};
