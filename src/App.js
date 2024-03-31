import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/HomePage/Home";
import Cart from './Components/Cart/cart';
import Orders from './Components/Orders/orders';
import Products from './Components/Products/productsPage';
import Signup from './Components/signuppage/signupPage';
import Signin from './Components/signinpage/signInPage';
import { ProductProvider } from './context/productContext';
import { AuthDetailsProvider } from './context/authDetailsContext';
import ProtectedRoute from './Components/protectedRoutes/protectedRoute';

function App() {

  const router = createBrowserRouter([
    {path: '/', element: <Navbar/>,
    children: [
      {path: '', element:<Home/>},
      {path: 'cart', element: <ProtectedRoute/>, children: [
        {path:"", element: <Cart/>}
      ]},
      {path: 'orders', element: <Orders/>},
      {path: 'products', element: <Products/>},
      {path: 'signup', element: <Signup/>},
      {path:'signin', element: <Signin/>}

    ]
  }
  ])
  return (
    <>
    <AuthDetailsProvider>

    <ProductProvider>
    <RouterProvider router={router}></RouterProvider>
    </ProductProvider>
    
    </AuthDetailsProvider>
    
    </>
  );
}

export default App;
