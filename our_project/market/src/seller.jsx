import Navbar from "./Navbar";  
 function Seller(){  
     return(  
         <div>  
             <Navbar/> 
             <div className="container"> 
             <h2>Seller Dashboard</h2>  
             <p>Welcome to the Seller Dashboard!</p> 
             <div className="dashboard-cards">
                 <div className="dashboard-card">
                     <h3>Manage Products</h3>
                     <div className="dashboard-card">Add product</div>
                     <div className="dashboard-card">view stock</div>
                     </div>
                     <div className="dashboard-card">
                     <h3>Sales</h3>
                     <div className="dashboard-card">Add sales</div>
                     <div className="dashboard-card">view sale summary</div>
                     </div>
                 </div>
             </div> 
         </div>  
     );  
 }

 export default Seller;