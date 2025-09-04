import { useState } from 'react';
import Navbar from './Navbar';
import { useProducts } from './ProductContext';
import { useSales } from './SalesContext';   // ✅ import sales context

function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const { products, addProduct, deleteProduct } = useProducts();
  const { sales } = useSales();  // ✅ access sales

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (productName && productPrice && productStock) {
      addProduct({
        name: productName,
        price: parseInt(productPrice),
        stock: parseInt(productStock)
      });
      setProductName('');
      setProductPrice('');
      setProductStock('');
      setShowForm(false);
    }
  };

  // ✅ calculate total sales summary
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalItemsSold = sales.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <p>Welcome Admin! Here you can manage products and view system sales.</p>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close Form' : 'Add New Product'}
          </button>
        </div>

        {/* ✅ Sales Summary */}
        <div className="sales-summary">
          <h3>Sales Summary</h3>
          <p><strong>Total Items Sold:</strong> {totalItemsSold}</p>
          <p><strong>Total Revenue:</strong> TZS {totalRevenue.toLocaleString()}</p>
        </div>

        {/* Product Add Form */}
        {showForm && (
          <form className="add-product-form" onSubmit={handleAddProduct} style={{ margin: '20px 0' }}>
            <h3>Add New Product</h3>
            <div>
              <label>Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Price (TZS):</label>
              <input
                type="number"
                value={productPrice}
                onChange={e => setProductPrice(e.target.value)}
                required
                min="1"
              />
            </div>
            <div>
              <label>Stock:</label>
              <input
                type="number"
                value={productStock}
                onChange={e => setProductStock(e.target.value)}
                required
                min="1"
              />
            </div>
            <button type="submit" className="btn-primary">Add Product</button>
          </form>
        )}

        {/* ✅ Sales Records Table */}
        <div className="sales-section">
          <h3>All Sales Records</h3>
          {sales.length === 0 ? (
            <p>No sales yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total (TZS)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={sale.id}>
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

        {/* ✅ Products Management */}
        <div className="products-section">
          <h3>All Products List</h3>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p>Price: TZS {product.price.toLocaleString()}</p>
                <p>In Stock: {product.stock}</p>
                <button 
                  className="btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
