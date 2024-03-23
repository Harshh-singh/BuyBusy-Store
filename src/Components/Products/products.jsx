import ProductCard from "../ProductCard/productCard";
import useProduct from "../../context/productContext";

function Products(){

    const {products} = useProduct();

    return(
       products.map((item)=>{
        return(
        // console.log(item);
        <ProductCard category={item.category} image={item.image}></ProductCard>
        )
       })
    )
}

export default Products;