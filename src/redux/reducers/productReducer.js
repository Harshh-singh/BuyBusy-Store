import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import {doc, getDoc, updateDoc, onSnapshot} from 'firebase/firestore';
import { db } from "../../firebaseinit";

const initialState = {
    products:[],
    initialProducts:[],
    loading: false,
    error: null,
    cartLoading: true,
    cartItems:[],
    getFromCartError: null,
    totalPrice: 0,
    myOrders: [],
    ordersLoading: true,
};

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        calculateTotalPrice:(state,action)=>{
            let newPrice = 0; 
            state.cartItems.forEach((item) => {
                newPrice += item.price*item.quantity
             })
            newPrice = Math.floor(newPrice);
            state.totalPrice = newPrice;
        },
        fetchMyOrders:(state,action) => {
            state.myOrders = action.payload;
        },
        filterProduct:(state, action) => {
            if(action.payload === ""){
                state.products = state.initialProducts
            }else{
                state.products = state.products.filter(product=>
                    product.category.toLowerCase().includes(action.payload.toLowerCase())
                )
            }         
        },
        searchProduct:(state, action) => {
            if(action.payload === ""){
                state.products = state.initialProducts
            }else{
                state.products = state.products.filter(product=>
                    product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    product.category.toLowerCase().includes(action.payload.toLowerCase())
                )
            }
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchProductsAsync.pending , (state) => {
            state.loading = true;
        })
        .addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.initialProducts = action.payload;
        })
        .addCase(fetchProductsAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })

        .addCase(fetchOrdersAsync.pending, (state) => {
            state.ordersLoading = true
        })
        .addCase(fetchOrdersAsync.fulfilled, (state) => {
            state.ordersLoading = false
        })

        .addCase(addToCartAsync.pending, (state, action) => {
            state.cartLoading = true;
        })
        .addCase(addToCartAsync.fulfilled, (state, action) => {
            state.cartLoading = false;
        })


        .addCase(getFromCartAsync.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.cartLoading = false;
        })
        .addCase(getFromCartAsync.rejected, (state, action) => {
            state.getFromCartError = action.payload;
            state.cartLoading = false
        })
        .addCase(getFromCartAsync.pending, (state, action) => {
            state.getFromCartError = action.payload;
            state.cartLoading = true
        })

    }
});

//get all products from API
export const fetchProductsAsync = createAsyncThunk(
    'product/fetch',
    async(_,thunkAPI) => {
        try{
           const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json();
            return data;          
            }catch(error){
                 return thunkAPI.rejectWithValue(error);
            }
    }
)


//add product to our cart and DB
export const addToCartAsync = createAsyncThunk(
    'product/addToCart',
    async(product, thunkAPI) => {
            const state = thunkAPI.getState();
            const authUser = state.authenticationReducer.authUser;
        
            if(!authUser){
                toast.error("Please SignIn");
            }

        try{
            const userDocRef = doc(db, 'users', authUser.userId);
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
            
            await updateDoc(userDocRef, {
                carts: carts
            });
            toast.success("Item added to cart")
            
            return {product, userId: authUser.uid}
        }
        catch(error){
            console.error("Error adding to cart: ", error);
            toast.error("Error adding to cart");
            return thunkAPI.rejectWithValue(error.message);
        }
    }    
)

//get products from our DB that we added in cart
export const getFromCartAsync = createAsyncThunk(
    "product/getFromCart",
    async(_,thunkAPI) =>{
        const state = thunkAPI.getState();
        const authUser = state.authenticationReducer.authUser;
        // const loading = state.authenticationReducer.loading;

            if(!authUser){
                return thunkAPI.rejectWithValue("User not authenticated");
            }
            try{
                return new Promise((resolve, reject) => {
                    const unsubscribe = onSnapshot(
                        doc(db, 'users', authUser.userId),(userDoc) => {
                            if(userDoc.exists()){
                            const products = userDoc.data().carts;
                            resolve(products);
                            }else {
                            console.log("User document does not exist");
                            resolve([]);  // Return an empty array if no user document exists
                            }
                        },(error) => {
                        console.error("Error fetching data:", error);
                        reject(error);
                        }
                    );
            
                    // Unsubscribe when the thunk is cancelled
                    thunkAPI.signal.addEventListener('abort', () => unsubscribe());
                });
            }catch(error){
                console.error("Error fetching data:", error);
            } 
        // }   
    }
)

// increase quantity of product in cart
export const increaseProductQuantityAsync = createAsyncThunk(
    "products/increaseQuantity",
    async(product,thunkAPI) => {
        const state = thunkAPI.getState();
        const authUser = state.authenticationReducer.authUser;
        if(!authUser){
         toast.error("Please SignIn");
        }try{
            const userDocRef = doc(db, 'users', authUser.userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                toast.error("User document does not exist.");
                return thunkAPI.rejectWithValue("User document does not exist");
            }           
            let carts = userDoc.data().carts;
            carts.forEach((item) => {
            if(item.id === product.id){
                    // console.log(item);               
                    item.quantity += 1                
                }
            })

            updateDoc(userDocRef, {
                carts: carts
             })
        
                            
        }catch(error){
            console.log(error);
        }
    }
            
    
)


// decrease quantity of product in cart
export const decreaseProductQuantityAsync = createAsyncThunk(
    "products/increaseQuantity",
    async(product,thunkAPI) => {
        const state = thunkAPI.getState();
        const authUser = state.authenticationReducer.authUser;
        if(!authUser){
         toast.error("Please SignIn");
        }try{
            const userDocRef = doc(db, 'users', authUser.userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                toast.error("User document does not exist.");
                return thunkAPI.rejectWithValue("User document does not exist");
            }           
            let carts = userDoc.data().carts;
            carts.forEach((item) => {
            if(item.id === product.id){
                    // console.log(item); 
                    if(item.quantity>1){              
                    item.quantity -= 1  
                    }              
                }
            })

            updateDoc(userDocRef, {
                carts: carts
             })
        
                            
        }catch(error){
            console.log(error);
        }
    }
            
    
)



// to remove product from cart
export const removeFromCartAsync = createAsyncThunk(
    "products/removeFromCart",
    async(product, thunkAPI) => {
            const state = thunkAPI.getState();
            const authUser = state.authenticationReducer.authUser;
        
            if(!authUser){
                console.log("not Logged in");
            }
            try {
                const userDocRef = doc(db, 'users', authUser.userId);
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) {
                    toast.error("User document does not exist.");
                    return thunkAPI.rejectWithValue("User document does not exist");
                }
    
                let carts = userDoc.data().carts;
                const newCarts = carts.filter(item => item.id !== product.id);
                console.log(newCarts);
    
                await updateDoc(userDocRef, { carts: newCarts });
    
                toast.success("Product removed from Cart");
    
                // Return the new carts array to update the state
                return newCarts;
    
            } catch (error) {
                console.log(error);
                toast.error("Failed to remove product from cart");
                return thunkAPI.rejectWithValue(error.message);
            }
        }
)

// To purchase items in our cart
export const purchaseItemsAsync = createAsyncThunk(
    'products/purchase',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const authUser = state.authenticationReducer.authUser;
      const cartItems = state.productReducer.cartItems;
      const totalPrice = state.productReducer.totalPrice;
      

        if (!authUser) {
          toast.error('Please SignIn');
        } 

        try{
            const userDocRef = doc(db, 'users', authUser.userId);
            const userDoc = await getDoc(userDocRef);
          
          let orders;
  
          if (userDoc.exists()) {
            orders = userDoc.data().orders;
          } else {
            orders = [];
          }
  
          if (cartItems.length === 0) {
            toast.error('Cart is empty');
            return;
          }
  
          const orderedItems = cartItems.map(item => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price
          }));
  
          const order = {
            items: orderedItems,
            totalPrice: totalPrice,
            date: new Date().toISOString().split('T')[0],
          };
  
          orders.push(order);
  
          await updateDoc(userDocRef, {
            orders: orders,
            carts: [],
          });
  
          toast.success('Item Purchased');
        
      } catch (error) {
        toast.error('Error in purchasing: ' + error.message);
      }
    }
  );

  // to get orders from db
  export const fetchOrdersAsync = createAsyncThunk(
    'products/fetchOrders',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const authUser = state.authenticationReducer.authUser;
        const fetchOrders = async() => {
            try{
                if(!authUser){
                    console.log("please Login");
                }else{
                    const unsubscribe = authUser && onSnapshot(doc(db, 'users', authUser.userId), (userDoc) => {
                        if (userDoc.exists()) {
                            let MyOrders = userDoc.data().orders.reverse();
                            thunkAPI.dispatch(productAction.fetchMyOrders(MyOrders));
                        } else {
                            console.log("User document does not exist");
                        }
                        // setOrdersLoading(false);
                    })         
                    return() => unsubscribe();            

                }

            }catch(error){
                console.log("error"+error);
            }
        }

        fetchOrders();
    }
)


export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
export const productSelector = (state) => state.productReducer;