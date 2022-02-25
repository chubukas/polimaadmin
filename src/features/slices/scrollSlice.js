import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSection: null,
  breadCrumbs: {},
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    // Use the PayloadAction type to declare the contents of `action.payload`
    changeActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },

    getBreadCrumb: (state, action) => {
      state.breadCrumbs = action.payload;
    },
  },
});

export const { changeActiveSection, getBreadCrumb } = scrollSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectActiveSection = (state) => state.scroll.activeSection;
export const selectBreadCrumbs = (state) => state.scroll.breadCrumbs;

export default scrollSlice.reducer;
