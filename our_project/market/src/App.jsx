// App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import { ProductProvider } from './ProductContext';
import { SalesProvider } from './SalesContext';

function App() {
  // Weka user moja kwa moja kwa ajili ya testing
  const user = "admin"; // Jaribu "seller" pia
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    localStorage.setItem("user", user);
  }
  
  return (
    <ProductProvider>
      <SalesProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/admin-dashboard" />} />
          </Routes>
        </Router>
      </SalesProvider>
    </ProductProvider>
  );
}



export default App;