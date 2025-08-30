import { useState } from "react"
import { useNavigate } from 'react-router-dom';

function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Seller"); 
  const navigate = useNavigate(); 
  
  const handleLogin = () => {
    if((role === "Admin" && username === "admin" && password === "1234") || 
       (role === "Seller" && username === "seller" && password === "0987")){
      localStorage.setItem("user", role);
      navigate(role === "Admin" ? "/admin" : "/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  
  return(
    <div className="container">
      <h2>Login</h2>
      <input  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input className="yy" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Admin">Admin</option>
        <option value="Seller">Seller</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;