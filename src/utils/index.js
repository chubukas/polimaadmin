import axios from "axios";

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

// validation inpust
export const validateInputs = (allInputs, setCheckEmpty, InputState) => {
  let checked = false;
  for (const input in allInputs) {
    if (allInputs[input] === "") {
      setCheckEmpty({ ...InputState, [input]: true });
      checked = true;
      break;
    }
  }
  return checked;
};

// validate email
export const validateEmail = (email) => {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !emailReg.test(email.toLowerCase());
};

// Display Error
export const errorMessage = (message) => (
  <small className="text-xs text-red-500">{message}</small>
);

//function to set token to all request
export const setAuthToken = (token) => {
  //Apply to every request
  if (token) axios.defaults.headers.common["Authorization"] = token;
  //    Delete Auth Header
  else delete axios.defaults.headers.common["Authorization"];
};

// Classname function
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Delete empty data
export const deleteEmptyInputs = (datas) => {
  for (const key in datas) {
    if (datas[key] === "") {
      delete datas[key];
    }
  }
};

// Map form data
export const formData = (data, files, fileName) => {
  let formData = new FormData();
  if (files && files.length > 0) {
    for (var x = 0; x < files.length; x++) {
      formData.append(fileName, files[x]);
    }
  }
  if (data) {
    for (const key in data) {
      const element = data[key];
      formData.append(key, element);
    }
  }
  return formData;
};

// Date Formator

export const formatDate = (date, showTime) => {
  let dateoptions;

  if (showTime) {
    dateoptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: "false",
    };
  } else {
    dateoptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
  }

  return Intl.DateTimeFormat("default", dateoptions).format(new Date(date));
};

// Backend API
export const backendApi = () => {
  return "http://localhost:5000/api/v1";
  //   return "https://apiofmidlman.herokuapp.com";
};
