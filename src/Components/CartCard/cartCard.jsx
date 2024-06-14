import styles from './cartCard.module.css'
// import useProduct from '../../context/productContext';
import { removeFromCartAsync } from '../../redux/reducers/productReducer';
import { useDispatch } from 'react-redux';
import { increaseProductQuantityAsync } from '../../redux/reducers/productReducer';
import { decreaseProductQuantityAsync } from '../../redux/reducers/productReducer';

function CartCard({product}){
    const dispatch = useDispatch();
    // const {removeFromCart, increaseQuantity, decreaseQuantity} = useProduct();

    function handleRemoveFromCart(product){
        dispatch(removeFromCartAsync(product))
    }

    function increaseQuantity(product){
        dispatch(increaseProductQuantityAsync(product))
    }

    function decreaseQuantity(product){
        dispatch(decreaseProductQuantityAsync(product))
    }
   
    return(
        // <>
        <div className={styles.prodContainer}>
        <div className={styles.card}>
            <div className={styles.prodImg}>
                <img src={product.image} alt={product.title} />
            </div>
            <div className={styles.prodInfo}>
            <h3>{product.title}</h3>
            <h4>${product.price}</h4>

            <div className={styles.quantity}>
                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png" alt="minus" className={styles.incImg}
                onClick={() => decreaseQuantity(product)}
                />
                <span>{product.quantity}</span>
                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png" alt="plus" className={styles.incImg}
                    onClick={() => increaseQuantity(product)}
                />
            </div>

            <button
            onClick={()=>handleRemoveFromCart(product)}
            >Remove From Cart</button>
            </div>
        </div>
        </div>
        /* </> */
    )
}

export default CartCard;