import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseinit";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth';


const initialState = {
    authUser:null,
    error: null,
    isAuthenticated: false,
    loading: false
};

const authenticationSlice = createSlice({

    name: 'authentication',
    initialState:initialState,
    reducers:{
        loginSuccess:(state, action) => {
            state.authUser = action.payload;
            state.error = null;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginError:(state, action) => {
            state.error = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },
        logout:(state, action) => {
            state.authUser = null;
            state.error = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers:(builder)=> {
        builder
        .addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
            state.authUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        })
        .addCase(getLoggedInUserAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getLoggedInUserAsync.rejected, (state, action) => {
            state.loading = false;
        })
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
        console.log(user);

        toast.success("Sign in successfully");
        // redirecting to cart    
        setTimeout(() => {
          navigate('/cart');
      }, 1000); 

      }
       catch(error) {
        thunkApi.dispatch(authenticationActions.loginError(error));
        toast.error("Invalid Email or password");
       }    
    }
)



// getting logged in user
export const getLoggedInUserAsync = createAsyncThunk(
    'auth/getLoggedUser',
    async(_,thunkApi) => {     
        return new Promise((resolve, reject) => { 
             onAuthStateChanged(auth, (user) => {
                if(user){
                    const userInfo = {
                        userEmail:user.email,
                        userId:user.uid
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    thunkApi.dispatch(authenticationActions.loginSuccess(userInfo));
                    resolve(userInfo);
                }else{
                    localStorage.removeItem('user');
                    thunkApi.dispatch(authenticationActions.loginError());
                    reject(new Error('No user is logged in'));
                }
            })
        })
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