import styles from './productCard.module.css';
// import useProduct from '../../context/productContext';
import { useDispatch } from 'react-redux';
import { addToCartAsync } from '../../redux/reducers/productReducer';

function ProductCard({product}){

    // const {addToCart} = useProduct();
    const dispatch = useDispatch();

   function handleAddToCart(product){
        // try {
            dispatch(addToCartAsync(product))
        // } catch (error) {
            // console.log(error);
        // }
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

            <button
            onClick={()=>handleAddToCart(product)}
            >Add to cart</button>
            </div>
        </div>
        </div>
        /* </> */
    )
}

export default ProductCard;