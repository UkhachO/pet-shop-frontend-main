import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import CategoryPage from "./CategoryPage/CategoryPage";
import ProductsPage from "./ProductsPage/ProductsPage";
import SalePage from "./SalePage/SalePage";
import ProductPage from "./ProductPage/ProductPage";
import CartPage from "./CartPage/CartPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:id" element={<CategoryPage />} />
      <Route path="/products/all" element={<ProductsPage />} />
      <Route path="/products/sale" element={<SalePage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;
