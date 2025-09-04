// SalesContext.jsx
import { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export function useSales() {
  return useContext(SalesContext);
}

export function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);

  const addSale = (sale) => {
    setSales([...sales, { ...sale, id: sales.length + 1 }]);
  };

  const value = { sales, addSale };

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
}
