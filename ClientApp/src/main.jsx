import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./components/Home.jsx";
import Category from "./components/Category.jsx";
import "./index.css";
import Layout from "./layouts/Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <NextUIProvider>
    <Layout title="Track">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Layout>
    </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
