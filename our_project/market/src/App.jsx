import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import Sales from './Sales';


function App() {
  const user = localStorage.getItem("user");
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={user === "seller" ? <SellerDashboard/> : <Navigate to="/login"/>}/>
        <Route path="/admin" element={user === "admin" ? <AdminDashboard/> : <Navigate to="/login"/>}/>
        <Route path="/sales" element={user === "seller" ? <Sales/> : <Navigate to="/login"/>}/>
        <Route path="*" element={<Navigate to={user ? (user === "admin" ? "/admin" : "/dashboard") : "/login"} />}/>
      </Routes>
    </Router>
  )
}

export default App