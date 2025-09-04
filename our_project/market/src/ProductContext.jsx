// ProductContext.jsx
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Leather Shoes", price: 75000, stock: 15 },
    { id: 2, name: "Handbag", price: 45000, stock: 8 },
    { id: 3, name: "Men's Suit", price: 120000, stock: 5 },
    { id: 4, name: "Women's Blouse", price: 55000, stock: 12 }
  ]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length + 1
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const value = {
    products,
    setProducts,   // ✅ include this so SellerDashboard can update stock
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
