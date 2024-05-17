import styles from './productCard.module.css';
// import useProduct from '../../context/productContext';

function ProductCard({product}){

    // const {addToCart} = useProduct();
    
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

            <button
            // onClick={()=>addToCart(product)}
            >Add to cart</button>
            </div>
        </div>
        </div>
        /* </> */
    )
}

export default ProductCard;