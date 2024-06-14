import { Outlet, useNavigate } from "react-router-dom";
import CartCard from "../CartCard/cartCard";
import styles from './cart.module.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getFromCartAsync, productAction, purchaseItemsAsync } from "../../redux/reducers/productReducer";
// import { NavLink } from "react-router-dom";

function Cart(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state)=>state.productReducer.cartItems);
    const cartLoading = useSelector((state)=>state.productReducer.cartLoading);
    const totalPrice = useSelector((state)=>state.productReducer.totalPrice);


// dispatching the getFromCartAsync to get all cart items
    useEffect(()=>{
      dispatch(getFromCartAsync());      
    },[dispatch])

// dispatching the calculateTotalPrice to get total price of cart items 
    useEffect(() => {
      if (cartItems.length >= 0) {
        dispatch(productAction.calculateTotalPrice());
      }
    }, [cartItems,dispatch]);

// to purchase our cart items
    const Purchase = () => {
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
      dispatch(purchaseItemsAsync())
    }

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
                   {/* <NavLink to='/orders'> */}
                   <button 
                      type="submit"
                      onClick={Purchase}
                      >Purchase</button>
                   {/* </NavLink> */}
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