import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home/Home";
import { DetailedProduct } from "../screens/DetailedProduct/DetailedProduct";
import { Cart } from "../screens/Cart/Cart";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route exact path="/detail/product/:id" element={< DetailedProduct />}/>
        <Route exact path="/cart" element={< Cart />}/>
      </Routes>
    </Router>
  );
};
