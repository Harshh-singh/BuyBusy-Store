import ProductCard from "../ProductCard/productCard";
import useProduct from "../../context/productContext";
import styles from './products.module.css'
function Products(){

    const {products} = useProduct();

    return(
        <>
        
        <div className={styles.productPage}>
       {products.map((item)=>(
        <ProductCard product ={item}></ProductCard>
       ))}
        </div>
        </>
    )
}

export default Products;