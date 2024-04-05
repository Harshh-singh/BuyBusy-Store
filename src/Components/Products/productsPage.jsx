import ProductCard from "../ProductCard/productCard";
import useProduct from "../../context/productContext";
import styles from './products.module.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Products(){

    const {products, loading, searchProduct, filterProducts} = useProduct();

    return(
        <>
        <ToastContainer />

        {loading? (
            <h1>Loading...</h1>
        ) : (

            <>

            <input type="text"
                   placeholder="Search Item..." 
                   className={styles.searchBar}
                   onChange={(e) => searchProduct(e.target.value)}
                   />

        <div className={styles.productPage}>
            
            <div className={styles.categoryContainer}>
            <div className={styles.categories}> 

                <h2>Category</h2>
                <span>Select one at a time </span>

                <label >      
                    <input type="checkbox"
                            value="men's clothing"
                            onChange={(e) => filterProducts(e.target.value, e.target.checked)}
                     />  
                    <span>Men's Clothing</span>
                </label>       

                <label >      
                    <input type="checkbox"  
                            value="women's clothing"
                            onChange={(e) => filterProducts(e.target.value, e.target.checked)}
                    />  
                    <span>Women's Clothing</span>
                </label> 

                <label >      
                    <input type="checkbox"
                            value="jewelery"
                            onChange={(e) => filterProducts(e.target.value, e.target.checked)}
                    />  
                    <span>Jewelery</span>
                </label>

                <label >      
                    <input type="checkbox" 
                         value="electronics"
                         onChange={(e) => filterProducts(e.target.value, e.target.checked)}
                    />  
                    <span>Electronics</span>
                </label>     

            </div>
            </div>

            <div className={styles.productList}>
                 {products.map((item, index)=>(
                    <ProductCard product ={item} key={index}></ProductCard>
                 ))}          
            </div>

        </div>
            

        </>

        )}
        
        
        </>
    )
}

export default Products;