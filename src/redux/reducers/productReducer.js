import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    loading: false,
    error: null,
    cart:[],
    cartQuantity:0,
};


const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        filterProduct:(state, action) => {

        },
        searchProduct:(state, action) => {

        },
        addToCart:(state, action) => {

        },
        removeFromCart:(state, action) => {

        },
        purchaseItems:(state, action) => {

        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductsAsync.pending , (state) => {
            state.loading = true
        })
        .addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload
        })
        .addCase(fetchProductsAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false
        })
    }
});


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

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
export const productSelector = (state) => state.productReducer;