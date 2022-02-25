import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/slices/authSlice";
import { userReducer } from "../features/reducers/userReducer";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
