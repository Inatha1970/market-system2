import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Supermarket System</div>
      <div>
        {role === "Seller" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/product">Product</Link>
            <Link to="/sales">Sales</Link>
          </>
        )}

        {role === "Admin" && <Link to="/admin">Admin Panel</Link>}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;