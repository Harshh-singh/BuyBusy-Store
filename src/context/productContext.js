import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export default function useProduct(){
    const context = useContext(ProductContext);
    
    return context;
};

const addToCart = (product) => {
    console.log(product);
}

    const ProductProvider = ({ children }) => {

    const[products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.log(error));
    },[]);


    return(
        <>
        <ProductContext.Provider value={{products, addToCart}}>
            {children}
        </ProductContext.Provider>
        </>
    )
}

export {ProductProvider};