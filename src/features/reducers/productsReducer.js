import {
  createAsyncThunk,
  createEntityAdapter,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";

import { fetchProducts } from "../API";

// All products Adapter
const productsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (products) => products._id,
});

// All Product Initial State
const initialProductsState = productsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// Single Product Initial State
const initialSingleProductState = {
  status: "idle",
  error: null,
  singleProduct: {},
};

const initialSearchedProducts = {
  status: "idle",
  error: null,
  searched: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// Single Product Thunk
export const fetchProductsBySlug = createAsyncThunk(
  "singleProduct/fetchProductsBySlug",
  async (slug) => {
    const response = await fetchProducts();
    const data = Object.entries(response).map(([data, keys]) => {
      return keys.filter((product) => product.productSlug === slug);
    });
    return data[0][0];
    // return response.data;
  }
);

// Search Product Thunk
export const fetchSearchProducts = createAsyncThunk(
  "searchedProducts/fetchSearchProducts",
  async (searchQueries, { getState }) => {
    const { name, category } = searchQueries;

    let data;
    if (!name && !category) {
      data = selectAllProduct(getState());
    } else if (name !== "" && category !== "") {
      const response = await fetchProducts();
      const datas = Object.entries(response).map(([data, keys]) => {
        return keys.filter(
          (products) =>
            products.productName === name &&
            products.productCategory === category
        );
      });
      data = datas[0];
    } else if (name !== "" && category === "") {
      const response = await fetchProducts();
      const datas = Object.entries(response).map(([data, keys]) => {
        return keys.filter((products) => products.productName === name);
      });
      data = datas[0];
    } else if (name === "" && category !== "") {
      const response = await fetchProducts();
      const datas = Object.entries(response).map(([data, keys]) => {
        return keys.filter((products) => products.productCategory === category);
      });
      data = datas[0];
    }

    return data;
  }
);

// All Products Reducer
export const productsReducer = createReducer(
  initialProductsState,
  (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
);

// Single Product Reducer
export const singleProductReducer = createReducer(
  initialSingleProductState,
  (builder) => {
    builder
      .addCase(fetchProductsBySlug.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductsBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
      });
  }
);

// Search Product Reducer
export const searchProductReducer = createReducer(
  initialSearchedProducts,
  (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // searchProductsAdapter.upsertMany(state, action.payload);
        state.searched = action.payload;
      });
  }
);

// All Products Selectors
export const getStateStatus = (state) => state.products.status;
export const getErorr = (state) => state.products.error;
export const {
  selectAll: selectAllProduct,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.products);

// Single Product Selectors
export const getsingleProductStatus = (state) => state.singleProduct.status;
export const getSingleProduct = (state) => state.singleProduct.singleProduct;

// Requested Types Product Selector
export const selectRequestedProducts = createSelector(
  [selectAllProduct, (state, request) => request],
  (products, request) =>
    products.filter((product) => product.productType.toLowerCase() === request)
);

// Feactured Products Selectors
export const selectFeacturedProducts = createSelector(
  [selectAllProduct],
  (products) => products.filter((product) => product.featured === true)
);

// Searched Product Selectors
export const getSearchedStatus = (state) => state.searchedProducts.status;
export const selectSeachedProducts = (state) => state.searchedProducts.searched;
