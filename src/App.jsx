import { Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/product-details/ProductDetailsPage";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";
import WrongPath from "./pages/wrong-path/WrongPath";
import Products from "./pages/products/Products";
import axios from "axios";

function App() {

  axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_LINK}`;
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetail />} />
      </Route>
      <Route path="*" element={<WrongPath />} />
    </Routes>
  );
}

export default App;
