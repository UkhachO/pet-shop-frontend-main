import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333",
});

export function getCategories() {
  return api.get("/categories").then((res) => res.data);
}

export function getProducts() {
  return api.get("/products/all").then((res) => res.data);
}

export function getProductById(id) {
  return api.get(`/products/${id}`).then((res) => {
    const arr = res.data;

    return Array.isArray(arr) ? arr[0] : arr;
  });
}

export default api;
