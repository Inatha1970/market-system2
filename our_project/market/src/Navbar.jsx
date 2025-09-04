// Navbar.jsx
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Sales Management System</h2>
      </div>
      <div className="nav-items">
        <span className="user-info">
          Role: {user === 'admin' ? 'Admin' : 'Seller'}
        </span>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;