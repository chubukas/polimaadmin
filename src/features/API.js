import { products } from "../data/products";

// A mock function to mimic making an async request for data
export function fetchProducts() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: products }), 500)
  );
}
