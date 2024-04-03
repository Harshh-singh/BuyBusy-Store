import { NavLink, Outlet } from "react-router-dom";
import useProduct from "../../context/productContext";
import CartCard from "../CartCard/cartCard";
import styles from './cart.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Cart(){
    const {cartItems, cartLoading, totalPrice, purchaseItems} = useProduct();    

    return(
      <>
        <ToastContainer/>
        {cartLoading?(
          <h1>Loading...</h1>
        ):(
                 <>
        <div className={styles.cartPage}>           

            {totalPrice>0 ?(
               <div className={styles.priceContainer}>

               <div className={styles.totalPrice}>
                   <span>Total Price:- ${totalPrice}/-</span>
                   <NavLink to='/orders'>
                   <button 
                   type="submit"
                   onClick={purchaseItems}
                   >Purchase</button>
                   </NavLink>
               </div>

           </div>
            ) : ("")}
             

            <div className={styles.cartList}>

              {cartItems.length > 0? cartItems.map((item, index) => (
                <CartCard product={item} key={index}/>
                )) :(

                    <h1>Cart is empty</h1>
                )}

            </div>
        </div>

        </>

        )}
        
        <Outlet/>
        </>
        
       )
    
}

export default Cart;