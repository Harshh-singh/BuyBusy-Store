import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseinit";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

const initialState = {
    authUser:null,
    error: null,
    isAuthenticated: false
};

const authenticationSlice = createSlice({

    name: 'authentication',
    initialState:initialState,
    reducers:{
        loginSuccess:(state, action) => {
            state.authUser = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginError:(state, action) => {
            state.authUser = null;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout:(state, action) => {
            state.authUser = null;
            state.error = null;
            state.isAuthenticated = false;
        }
    }

});



//signin function
export const signInAsync = createAsyncThunk(
    'auth/signIn',
    async({email,password,navigate},thunkApi) => {
    try{
        // sign in user with email and password 
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));

        const userInfo = {
            userEmail:user.email,
            userId:user.uid
        }

        // dispatching the login function
        thunkApi.dispatch(authenticationActions.loginSuccess(userInfo));

        // toast notification
        toast.success("Sign in successfully");

        // redirecting to cart    
    //     setTimeout(() => {
    //       navigate('/cart');
    //   }, 1000); 

      }
       catch(error) {
        thunkApi.dispatch(authenticationActions.loginError(error));
        toast.error("Invalid Email or password");
       }    
    }
)

// signout function
export const signOutAsync = createAsyncThunk(
    'auth/signOut',
    async(_,thunkApi) => {
         try{
            await auth.signOut();
            localStorage.removeItem('user');
            thunkApi.dispatch(authenticationActions.logout());
            console.log('signout');
            toast.success("Signed out");
            
            }catch(err){
            toast.error("Error signing out");
            console.log('error signing out' + err);
            }
           
        }
    )

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
export const authenticationSelector = (state) => state.authenticationReducer;