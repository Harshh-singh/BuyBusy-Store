import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/HomePage/Home";
import Cart from './Components/Cart/cart';
import Orders from './Components/Orders/orders';
import Products from './Components/Products/productsPage';
import { ProductProvider } from './context/productContext';

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
    <ProductProvider>
    <RouterProvider router={router}></RouterProvider>
    </ProductProvider>
    
    </>
  );
}

export default App;
