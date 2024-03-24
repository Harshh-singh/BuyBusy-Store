import styles from './productCard.module.css';
import useProduct from '../../context/productContext';

function ProductCard({product}){

    const {addToCart} = useProduct();
    
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

            <button
            onClick={()=>addToCart(product)}
            >Add to cart</button>
            </div>
        </div>
        </div>
        /* </> */
    )
}

export default ProductCard;