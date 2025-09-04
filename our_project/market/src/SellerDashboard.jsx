import { useState } from "react";
import Navbar from "./Navbar";
import { useProducts } from "./ProductContext";
import { useSales } from "./SalesContext";  // ✅ import

function SellerDashboard() {
  const { products, setProducts } = useProducts();
  const { addSale, sales } = useSales();   // ✅ get sales context
  const [quantity, setQuantity] = useState({});
  const [message, setMessage] = useState("");

  const handleSell = (product) => {
    const qty = quantity[product.id] || 0;

    if (qty <= 0) {
      setMessage("⚠️ Please enter a valid quantity.");
      return;
    }
    if (qty > product.stock) {
      setMessage("⚠️ Quantity exceeds available stock!");
      return;
    }

    // reduce stock
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - qty } : p
      )
    );

    // create sale record
    const saleRecord = {
      productName: product.name,
      quantity: qty,
      total: qty * product.price,
      date: new Date().toLocaleString(),
    };

    // save to global sales
    addSale(saleRecord);

    setMessage(
      `✅ You sold ${qty} ${product.name}(s) for a total of ${saleRecord.total.toLocaleString()} TZS`
    );
    setQuantity({ ...quantity, [product.id]: 0 });
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Seller Dashboard</h2>
          <p>Welcome Seller! Here you can sell products posted by the Admin.</p>
        </div>

        {/* Product Table */}
        <div className="products-section">
          <h3>Available Products</h3>
          {message && <p className="message">{message}</p>}
          <div className="products-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price (TZS)</th>
                  <th>Quantity Available</th>
                  <th>Stock Status</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={`stock-status ${
                          product.stock > 5 ? "in-stock" : "low-stock"
                        }`}
                      >
                        {product.stock > 5 ? "In Stock" : "Low Stock"}
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity[product.id] || ""}
                        onChange={(e) =>
                          setQuantity({
                            ...quantity,
                            [product.id]: parseInt(e.target.value, 10),
                          })
                        }
                        style={{ width: "60px", marginRight: "8px" }}
                      />
                      <button
                        onClick={() => handleSell(product)}
                        disabled={product.stock <= 0}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Summary (global) */}
        <div className="sales-section">
          <h3>Sales Summary</h3>
          {sales.length === 0 ? (
            <p>No sales yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity Sold</th>
                  <th>Total (TZS)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.total.toLocaleString()}</td>
                    <td>{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
