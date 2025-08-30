import {useeffect, useState} from 'react';
import Navbar from './Navbar.jsx';
 function SellerDashboard(){
    const[stockData,setstockData]=useState([]);
    const[productsData, setproductsData]=useState([]);
    const [salesData, ]=useState([]);
    useEffect(()=>{
        setstockData([{name:"Apple",stock:100},{name:"Banana",stock:150}
           , {name:"Orange",stock:200}
            ,{name:"Grapes",stock:80}
           , {name:"Mango",stock:50}
           , {name:"Pineapple",stock:60}
           , {name:"Strawberry",stock:90}
           , {name:"Blueberry",stock:70}
           , {name:"Watermelon",stock:40}
           , {name:"Papaya",stock:30}
            ,{name:"chocolate",stock:120}
            ,{name:"Ice-cream",stock:110}
            ,{name:"Juice",stock:130}
            ,{name:"Bread",stock:140}
            ,{name:"Butter",stock:160}
            ,{name:"Cheese",stock:170}
            ,{name:"Yogurt",stock:180}
            ,{name:"Eggs",stock:190}
            ,{name:"Chicken",stock:210}
            ,{name:"Fish",stock:220}
            ,{name:"Rice",stock:230}
            ,{name:"Pasta",stock:240}
            ,{name:"Cereal",stock:250}
            ,{name:"Coffee",stock:260}
            ,{name:"Tea",stock:270}
            ,{name:"Sugar",stock:280}
            ,{name:"Salt",stock:290}
            ,{name:"Pepper",stock:300}
            ,{name:"Oil",stock:310}
            ,{name:"Vinegar",stock:320}
            ,{name:"Ketchup",stock:330}
            ,{name:"Mustard",stock:340}
            ,{name:"Mayonnaise",stock:350}
            ,{name:"Soy Sauce",stock:360}]);
            setproductsData([{id:1,name:"Apple"}
              , {id:2,name:"Banana"}
                , {id:3,name:"Orange"}
                , {id:4,name:"Grapes"}
                , {id:5,name:"Mango"}
                , {id:6,name:"Pineapple"}
                , {id:7,name:"Strawberry"}
                , {id:8,name:"Blueberry"}
                , {id:9,name:"Watermelon"}
                , {id:10,name:"Papaya"}
                , {id:11,name:"chocolate"}
                , {id:12,name:"Ice-cream"}
                , {id:13,name:"Juice"}
                , {id:14,name:"Bread"}
                , {id:15,name:"Butter"}
                , {id:16,name:"Cheese"}
                , {id:17,name:"Yogurt"}
                , {id:18,name:"Eggs"}
                , {id:19,name:"Chicken"}
                , {id:20,name:"Fish"}
                , {id:21,name:"Rice"}
                , {id:22,name:"Pasta"}
                , {id:23,name:"Cereal"}
                , {id:24,name:"Coffee"} 
                , {id:25,name:"Tea"}
                , {id:26,name:"Sugar"}
                , {id:27,name:"Salt"}
                , {id:28,name:"Pepper"}
                , {id:29,name:"Oil"}
                , {id:30,name:"Vinegar"}
                , {id:31,name:"Ketchup"}
                , {id:32,name:"Mustard"}
                , {id:33,name:"Mayonnaise"}
                , {id:34,name:"Soy Sauce"}
            ]),
            setSalesdata([{id:1,product:"Apple",quantity:10,total:50,}
            ,{id:2,product:"Banana",quantity:15,total:30,}
            ,{id:3,product:"Orange",quantity:20,total:40,}
            ,{id:4,product:"Grapes",quantity:8,total:20,}
            ,{id:5,product:"Mango",quantity:5,total:25,}
            ,{id:6,product:"Pineapple",quantity:6,total:18,}
            ,{id:7,product:"Strawberry",quantity:9,total:27,}
            ,{id:8,product:"Blueberry",quantity:7,total:21,}
            ,{id:9,product:"Watermelon",quantity:4,total:16,}
            ,{id:10,product:"Papaya",quantity:3,total:15,}
            ,{id:11,product:"chocolate",quantity:12,total:60,}
            ,{id:12,product:"Ice-cream",quantity:11,total:55,}
            ,{id:13,product:"Juice",quantity:13,total:65,}
            ,{id:14,product:"Bread",quantity:14,total:70,}
            ,{id:15,product:"Butter",quantity:16,total:80,}
            ,{id:16,product:"Cheese",quantity:17,total:85,}
            ,{id:17,product:"Yogurt",quantity:18,total:90,}
            ,{id:18,product:"Eggs",quantity:19,total:95,}
            ,{id:19,product:"Chicken",quantity:21,total:105,}
            ,{id:20,product:"Fish",quantity:22,total:110,}
            ,{id:21,product:"Rice",quantity:23,total:115,}
            ,{id:22,product:"Pasta",quantity:24,total:120,}
            ,{id:23,product:"Cereal",quantity:25,total:125,}
            ,{id:24,product:"Coffee",quantity:26,total:130,}
            ,{id:25,product:"Tea",quantity:27,total:135,}
            ,{id:26,product:"Sugar",quantity:28,total:140,}
            ,{id:27,product:"Salt",quantity:29,total:145,}
            ,{id:28,product:"Pepper",quantity:30,total:150,}
            ,{id:29,product:"Oil",quantity:31,total:155,}
            ,{id:30,product:"Vinegar",quantity:32,total:160,}   
            ,{id:31,product:"Ketchup",quantity:33,total:165,}
            ,{id:32,product:"Mustard",quantity:34,total:170,}
            ,{id:33,product:"Mayonnaise",quantity:35,total:175,}
            ,{id:34,product:"Soy Sauce",quantity:36,total:180,}]);
    },[]);
    return(
        <div>
            <navbar/>
            <div className="container">
                <h2>Seller Dashboard</h2>
                <div className="dashboard-card">
                    <div className="dashboard-card">product: {productsData.length}</div>
                    <div className="dashboard-card">stock: {stockData.length}</div>
                    <div className="dashboard-card">sales: {salesData.length}</div>
                </div>
                <h3> Real time stock</h3>
                 {stockData.map(item=>( <div key={item.name}className="stock-box">{item.name}:{item.stock}</div>))}
            </div>
            </div>
    );
}

export default SellerDashboard;