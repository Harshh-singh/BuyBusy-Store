// using redux
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/HomePage/Home";
import Cart from './Components/Cart/cart';
import Orders from './Components/Orders/orders';
import Products from './Components/Products/productsPage';
import Signup from './Components/signuppage/signupPage';
import Signin from './Components/signinpage/signInPage';
import ProtectedRoute from './Components/protectedRoutes/protectedRoute';
import { useDispatch } from 'react-redux';
import { getLoggedInUserAsync } from './redux/reducers/authenticationReducer';
import { useEffect } from 'react';


function App() {

const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLoggedInUserAsync());
  },[dispatch]);

  const router = createBrowserRouter([
    {path: '/', element: <Navbar/>,
    children: [
      {path: '', element:<Home/>},
      {path: 'cart', element: <ProtectedRoute/>, children: [
        {path:"", element: <Cart/>},
      ]},
      {path: 'orders', element: <ProtectedRoute/>, children: [
        {index: true, element: <Orders/>}
    ]},
      {path: 'products', element: <Products/>},
      {path: 'signup', element: <Signup/>},
      {path:'signin', element: <Signin/>}

    ]
  }
  ])
  return (
    <>

    <RouterProvider router={router}></RouterProvider>
    
    </>
  );
}

export default App;
