import { useState, useEffect } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import SalesList from './components/SalesList';
import Reports from './components/Reports';
import SaleForm from './components/SaleForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSaleForm, setShowSaleForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowSaleForm(true);
  };

  const handleSaleComplete = (sale) => {
    // Refresh the current view
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductList onSelectProduct={handleSelectProduct} />;
      case 'sales':
        return <SalesList />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </main>

      {showSaleForm && selectedProduct && (
        <SaleForm
          product={selectedProduct}
          onClose={() => {
            setShowSaleForm(false);
            setSelectedProduct(null);
          }}
          onSaleComplete={handleSaleComplete}
        />
      )}
    </div>
  );
}

export default App;