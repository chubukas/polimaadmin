import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  chart: [],
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    // Use the PayloadAction type to declare the contents of `action.payload`
    addChartInState: (state, action) => {
      if (state.chart.length < 1) {
        state.chart.push(action.payload);
      } else {
        const product = state.chart.find(
          (item) => item.productId === action.payload.productId
        );

        if (product) {
          const index = state.chart.indexOf(product);
          state.chart[index].order_quantity = action.payload.order_quantity;
        } else {
          state.chart.push(action.payload);
        }
      }
    },
    deleteChartInState: (state, action) => {
      const id = action.payload;
      const filtered = state.chart.filter((data) => data.productId !== id);
      state.chart = filtered;
    },

    decreaseCartItemQuantity: (state, action) => {
      const id = action.payload;
      const product = state.chart.find((item) => item.productId === id);
      const index = state.chart.indexOf(product);
      state.chart[index].order_quantity = state.chart[index].order_quantity - 1;
    },

    increaseCartItemQuantity: (state, action) => {
      const id = action.payload;
      const product = state.chart.find((item) => item.productId === id);
      const index = state.chart.indexOf(product);
      state.chart[index].order_quantity = state.chart[index].order_quantity + 1;
    },

    sendCart: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const {
  addChartInState,
  deleteChartInState,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  sendCart,
} = chartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChart = (state) => state.chart.chart;

export default chartSlice.reducer;
