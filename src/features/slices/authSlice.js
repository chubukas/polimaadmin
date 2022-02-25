import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { backendApi } from "../../utils";
import { dataEncryption, storageDecryptedData } from "../../utils/dataSecurity";
import { isToken, TOKEN, USERDATA } from "../../utils/GetterSetter";

const initialState = {
  isAuthenticated: isToken(TOKEN),
  token: storageDecryptedData(TOKEN),
  userDetails: JSON.parse(storageDecryptedData(USERDATA)),
  status: "idle",
  response: {},
  loginResponse: {},
  signUpResponse: {},
};

// Log In API action.
export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  const response = await fetch(`${backendApi()}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
});

// Forgot password API action.
export const userForgotPassword = createAsyncThunk(
  "auth/userForgotPassword",
  async (payload) => {
    const response = await fetch(`${backendApi()}/admin/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  }
);

// Forgot password API action.
export const userResetPassword = createAsyncThunk(
  "auth/userResetPassword",
  async (payload) => {
    const response = await fetch(`${backendApi()}/admin/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  }
);

// Sign Up API actions
export const authSignUp = createAsyncThunk(
  "auth/authSignUp",
  async (payload) => {
    let response;
    try {
      const data = await axios.post(`${backendApi()}/admin/signup`, payload);
      response = data.data;
    } catch (error) {
      response = error.response.data;
    }

    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    authSignOut: (state, action) => {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USERDATA);
      state.isAuthenticated = false;
      state.token = null;
      state.userDetails = null;
      state.response = {};
      state.loginResponse = {};
      state.signUpResponse = {};
      state.status = "idle";
    },

    clearResponse: (state, action) => {
      state.response = {};
      state.loginResponse = {};
      state.signUpResponse = {};
      state.status = "idle";
    },
  },

  extraReducers: {
    // Sign Up
    [authSignUp.pending]: (state, action) => {
      state.status = "loading";
    },
    [authSignUp.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.signUpResponse = action.payload;
    },
    [authSignUp.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    // Login In
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const { token, data, status } = action.payload;

      if (status === "success") {
        // Encrypt data before storing in database
        localStorage.setItem(TOKEN, dataEncryption(token));
        localStorage.setItem(USERDATA, dataEncryption(JSON.stringify(data)));

        //Decrypt and set data to state
        state.token = storageDecryptedData(TOKEN);
        state.userDetails = JSON.parse(storageDecryptedData(USERDATA));
        state.isAuthenticated = isToken(TOKEN);
        state.loginResponse = {};
      } else {
        state.loginResponse = action.payload;
      }

      state.status = "succeeded";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    // Forgot Password
    [userForgotPassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [userForgotPassword.fulfilled]: (state, action) => {
      state.response = action.payload;
      state.status = "succeeded";
    },
    [userForgotPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    // Reset Password
    [userResetPassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [userResetPassword.fulfilled]: (state, action) => {
      state.response = action.payload;
      state.status = "succeeded";
    },
    [userResetPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { authSignOut, clearResponse } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.auth.userDetails;
export const selectUserStatus = (state) => state.auth.status;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectResponse = (state) => state.auth.response;
export const selectLoginResponse = (state) => state.auth.loginResponse;
export const selectSignUpResponse = (state) => state.auth.signUpResponse;

export default authSlice.reducer;
