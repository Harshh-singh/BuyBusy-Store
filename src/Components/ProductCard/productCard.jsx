import styles from './productCard.module.css';

function ProductCard({category, image}){
    return(
        <>
        <div className={styles.card}>
            <div className={styles.prodImg}>
                <img src={image} alt="" />
            </div>
            <span>Prod Name</span>
            <h3>price</h3>
            <button>Add to cart</button>
        </div>
        </>
    )
}

export default ProductCard;