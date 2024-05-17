import { authenticationReducer } from "./reducers/authenticationReducer";
import { productReducer } from "./reducers/productReducer";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer:{
        authenticationReducer,
        productReducer
    },
});