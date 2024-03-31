import { Outlet } from "react-router-dom";
import useProduct from "../../context/productContext";
import CartCard from "../CartCard/cartCard";
import styles from './cart.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Cart(){
    const {cartItems} = useProduct();    

    return(
        
        <>
          <ToastContainer/>        
        <div className={styles.CartPage}>
        {cartItems.length > 0?cartItems.map((item, index) => (
          <CartCard product={item} key={index}/>
        )):(
          
          <h1>Cart is empty</h1>
        )}
        </div>
        <Outlet/>
        </>
        
       )
    
}

export default Cart;