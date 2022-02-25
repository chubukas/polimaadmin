import {
  createAsyncThunk,
  createReducer,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { backendApi } from "../../utils";
import { dataEncryption } from "../../utils/dataSecurity";
import { USERDATA } from "../../utils/GetterSetter";

const initialState = {
  status: "idle",
  passwordResponse: {},
  updateUserResponse: {},
  error: "",
};

// Create Action
export const resetStatedata = createAction("resetStatedata");

// Update password API action.
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (payload) => {
    let response;
    try {
      const data = await axios.patch(
        `${backendApi()}/admin/updatePassword`,
        payload
      );
      response = data.data;
    } catch (error) {
      response = error.response.data;
    }

    return response;
  }
);

// Update user API action.
export const userActions = createAsyncThunk(
  "user/userActions",
  async (payload) => {
    const { action } = payload;
    let response;

    try {
      if (action === "updateUser") {
        const responseData = await axios.patch(
          `${backendApi()}/admin`,
          payload.data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        response = responseData.data;
      } else if (action === "deleteUser") {
        const responseData = await axios.delete(`${backendApi()}/admin`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        response = responseData.data;
      }
    } catch (error) {
      response = error.response.data;
    }

    return response;
  }
);

// User Reducer
export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Update password action
    .addCase(updatePassword.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.passwordResponse = action.payload;
    })
    .addCase(updatePassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    // Reset state action
    .addCase(resetStatedata, (state, action) => {
      state.status = "idle";
      state.passwordResponse = {};
      state.updateUserResponse = {};
    })
    // Update user data action
    .addCase(userActions.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(userActions.fulfilled, (state, action) => {
      const { data, status } = action.payload;
      if (status === "success") {
        // Encrypt data before storing in localstorage;
        localStorage.setItem(USERDATA, dataEncryption(JSON.stringify(data)));
        state.updateUserResponse = action.payload;
      } else {
        state.updateUserResponse = action.payload;
      }
      state.status = "succeeded";
    })
    .addCase(userActions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
});

// Selectors
export const selectRPasswordResponse = (state) => state.user.passwordResponse;
export const selectUpdateUserResponse = (state) =>
  state.user.updateUserResponse;
export const userUpdateStatus = (state) => state.user.status;
