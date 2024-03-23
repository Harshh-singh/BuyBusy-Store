import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/HomePage/Home";
import Cart from './Components/Cart/cart';
import Orders from './Components/Orders/orders';
import Products from './Components/Products/products';

function App() {

  const router = createBrowserRouter([
    {path: '/', element: <Navbar/>,
    children: [
      {path: '', element:<Home/>},
      {path: 'cart', element: <Cart/>},
      {path: 'orders', element: <Orders/>},
      {path: 'products', element: <Products/>}
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
