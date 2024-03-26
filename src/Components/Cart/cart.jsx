import useProduct from "../../context/productContext";
import CartCard from "../CartCard/cartCard";
import styles from './cart.module.css';

function Cart(){
    const {cartItems} = useProduct();    

    return(
        
        <>
        <div className={styles.CartPage}>
        {cartItems.length > 0?cartItems.map((item, index) => (
          <CartCard product={item}/>
        )):(
          
          <h1>Cart is empty</h1>
        )}
        </div>
        </>
       )
    
}

export default Cart;