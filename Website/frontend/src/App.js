import React from "react";
import { Routes, Route } from "react-router-dom";

import Authentication from "./js/Pages/Authentication";
import Home from "./js/Pages/Home";
import Products from "./js/Pages/ManagerProducts";
import ProuctAdd from "./js/Controllers/Add/Product";
import Customers from "./js/Pages/ManagerCustomers";
import ProuctEdit from "./js/Controllers/Edit/Product";
import NewsAdd from "./js/Controllers/Add/News";

import "./App.css";
import News from "./js/Pages/ManagerNews";
import NewsEdit from "./js/Controllers/Edit/News";
import Orders from "./js/Pages/ManagerOrders";
import DetailOrder from "./js/Components/DetailOrder";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication />}></Route>

      <Route path="/home" element={<Home />}></Route>

      <Route path="/products" element={<Products />}></Route>

      <Route path="/products/add" element={<ProuctAdd />}></Route>

      <Route path="/products/detail/:id" element={<ProuctEdit />}></Route>

      <Route path="/orders" element={<Orders />}></Route>

      <Route path="/orders/detail/:id" element={<DetailOrder />}></Route>

      <Route path="/news" element={<News />}></Route>

      <Route path="/news/add" element={<NewsAdd />}></Route>

      <Route path="/news/detail/:id" element={<NewsEdit />}></Route>

      <Route path="/customers" element={<Customers />}></Route>
    </Routes>
  );
}

export default App;
