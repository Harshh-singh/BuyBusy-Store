import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebaseinit";
import { addDoc, collection, onSnapshot,deleteDoc, doc } from "firebase/firestore"; 
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


//create new context
const ProductContext = createContext();

//to use the context to other components
export default function useProduct(){
    const context = useContext(ProductContext);
    
    return context;
};


  const ProductProvider = ({ children }) => {

    const[products, setProducts] = useState([]);
    const[cartItems, setCartItems] = useState([]);

    //to fetch data from api and shown to product page
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.log(error));
    },[]);


    //to add the selected product to our database in realtime
    const addToCart = async (product) => {
        try{
        await addDoc(collection(db, "cart"), {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category
          });
    
          toast.success('Item added to cart');
        }
        catch(error){
            console.error("Error writing document: ", error);
        }
    }


    //to get products from database and shown to cart
    useEffect(()=> {

        const unsubscribe = onSnapshot(collection(db, 'cart'), (snapshot) =>{
                    setCartItems(snapshot.docs.map((docs) => docs.data()));
            })

            return() => unsubscribe();

    },[setCartItems]);


    return(
        <>
        <ProductContext.Provider value={{products, addToCart, cartItems}}>
            {children}
        </ProductContext.Provider>
        </>
    )
}

export {ProductProvider};