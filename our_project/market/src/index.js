import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductProvider } from "./ProductContext";
import { SalesProvider } from "./SalesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <SalesProvider>
        <App />
      </SalesProvider>
    </ProductProvider>
  </React.StrictMode>
);
