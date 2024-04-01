import styles from './cartCard.module.css'
import useProduct from '../../context/productContext';

function CartCard({product}){

    const {removeFromCart, increaseQuantity, decreaseQuantity} = useProduct();
   
    return(
        // <>
        <div className={styles.prodContainer}>
        <div className={styles.card}>
            <div className={styles.prodImg}>
                <img src={product.image} alt={product.title} />
            </div>
            <div className={styles.prodInfo}>
            <h4>{product.title}</h4>

            <p>₹{product.price}</p>

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
            onClick={()=>removeFromCart(product)}
            >Remove From Cart</button>
            </div>
        </div>
        </div>
        /* </> */
    )
}

export default CartCard;