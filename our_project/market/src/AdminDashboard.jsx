import Navbar from "./Navbar"; 

function AdminDashboard(){  
  return(  
    <div>  
      <Navbar/> 
      <div className="container"> 
        <h2>Admin Dashboard</h2>  
        <p>Welcome to the Admin Dashboard!</p> 
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Manage Users</h3>
          </div>
          <div className="dashboard-card">
            <h3>View Stock</h3>
          </div>
          <div className="dashboard-card">
            <h3>View Sale Summary</h3>
          </div>
        </div>
      </div> 
    </div>  
  );  
}

export default AdminDashboard;