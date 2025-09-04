// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // admin or seller
  const navigate = useNavigate();

  // Default credentials
  const defaultCredentials = {
    admin: { username: "admin", password: "admin123" },
    seller: { username: "seller", password: "seller123" }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select your role!");
      return;
    }

    // Check if credentials match the default ones
    const expected = defaultCredentials[role];
    if (username === expected.username && password === expected.password) {
      localStorage.setItem("user", role);
      navigate(`/${role}-dashboard`);
    } else {
      alert("Username or password is incorrect!");
    }
  };

  return (
    <div className="container">
      <h2>Login to System</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
        </select>

        <button type="submit">Login</button>
        
        <div className="credentials-info">
          <p><strong>Default credentials:</strong></p>
          <p>Admin: username = <strong>admin</strong>, password = <strong>admin123</strong></p>
          <p>Seller: username = <strong>seller</strong>, password = <strong>seller123</strong></p>
        </div>
      </form>
    </div>
  );
}

export default Login;