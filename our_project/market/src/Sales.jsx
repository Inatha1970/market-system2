import Navbar from "./Navbar"; 

 function Sales(){  
    return(  
        <div>  
            <Navbar/> 
            <div className="container"> 
            <h2>Sales Page</h2>  
            <p>Welcome to the Sales Page!</p> 
            <p>Add and view sales , totals calculation and update stock</p>
            </div>
        </div>  
    );  
}

export default Sales;