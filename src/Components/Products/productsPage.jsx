import ProductCard from "../ProductCard/productCard";
import useProduct from "../../context/productContext";
import styles from './products.module.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Products(){

    const {products} = useProduct();

    return(
        <>
        <ToastContainer />
        <div className={styles.productPage}>
       {products.map((item, index)=>(
        <ProductCard product ={item} key={index}></ProductCard>
       ))}

        </div>
        
        </>
    )
}

export default Products;