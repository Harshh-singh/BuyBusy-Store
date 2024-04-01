import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebaseinit";
import {  doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"; 
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useAuthDetails from "./authDetailsContext";


//create new context
const ProductContext = createContext();

//to use the context to other components
export default function useProduct(){
    const context = useContext(ProductContext);
    
    return context;
};


  const ProductProvider = ({ children }) => {

    const {authUser} = useAuthDetails();
    const[products, setProducts] = useState([]);
    const[cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(true);

    //to fetch data from api and shown to product page
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => 
            setProducts(data),
            setLoading(false)
        )
        .catch(error => console.log(error));
    },[]);


     //increase quantity of product in cart
    const increaseQuantity = async (product) => {

        try{
            if(!authUser){
                toast.error("Please SignIn");
            }else{
            const userDocRef = doc(db, 'users', authUser.uid);
            const userDoc = await getDoc(userDocRef);
            let carts;

            if(userDoc.exists()){
                carts = userDoc.data().carts;
            }else{
                carts = [];
            }

            carts.forEach((item) => {
                if(item.id === product.id){
                    console.log(item);
                    item.quantity += 1;

                }
            })

            updateDoc(userDocRef, {
                carts: carts
            })
        }
            
        }catch(error){
            console.log(error);
        }
    }

    //decrease quantity of product in cart
    const decreaseQuantity = async (product) => {

        try{
            if(!authUser){
                toast.error("Please SignIn");
            }else{
            const userDocRef = doc(db, 'users', authUser.uid);
            const userDoc = await getDoc(userDocRef);
            let carts;

            if(userDoc.exists()){
                carts = userDoc.data().carts;
            }else{
                carts = [];
            }

            carts.forEach((item) => {
                if(item.id === product.id){
                    console.log(item);
                    if(item.quantity>1){
                        item.quantity -= 1;
                    }

                }
            })

            updateDoc(userDocRef, {
                carts: carts
            })
        }
            
        }catch(error){

        }
    }



    //to add the selected product to our database in realtime
    const addToCart = async (product) => {    
        try{
            if(!authUser){
                toast.error("Please SignIn");
            }else{
            const userDocRef = doc(db, 'users', authUser.uid);
            const userDoc = await getDoc(userDocRef);
            let carts;

            if(userDoc.exists()){
                carts = userDoc.data().carts;
            }else{
                carts = [];
            }

            let itemExists = false;
            carts.forEach((item) => {
                if(item.id === product.id){
                    console.log(item);
                    item.quantity += 1;
                    itemExists = true;

                }
            })

            if(!itemExists){
            carts.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category, 
                quantity: 1
            });
        }

            updateDoc(userDocRef, {
            carts: carts
           });
           toast.success("Item added to cart")
                        
        }

        }catch(err){
            toast.error("Failed to add item to cart")
        }
    }



    // to remove product from cart
    const removeFromCart = async(product) => {

        try{
            if(!authUser){
                console.log("not Logged in");
            }else{
                const userDocRef = doc(db, 'users', authUser.uid);
                const userDoc = await getDoc(userDocRef);
                let carts;
    
                if(userDoc.exists()){
                    carts = userDoc.data().carts;
                   const newCarts = carts.filter(item => item.id !== product.id);
                   console.log(newCarts)

                   await updateDoc(userDocRef, {carts:newCarts})

                toast.success("Product removed from Cart");

                }else{
                    carts = [];
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    //to get products from database and shown to cart
    useEffect(()=> {

        const fetchdata = async() => {
         try{

            if(!authUser){
                console.log("please Login");
            }else{
            const unsubscribe = authUser && onSnapshot(doc(db, 'users', authUser.uid), (userDoc) => {
            if (userDoc.exists()) {
                setCartItems(userDoc.data().carts);
                setCartLoading(false);
            } else {
                console.log("User document does not exist");
            }
        })

        return() => unsubscribe();
                }
        }catch(error){

        console.error("Error fetching data:", error);
} 
    }
        fetchdata();   

    },[authUser]);


    return(
        <>
        <ProductContext.Provider value={{products, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cartItems, cartLoading, loading}}>
            {children}
        </ProductContext.Provider>
        </>
    )
}

export {ProductProvider};