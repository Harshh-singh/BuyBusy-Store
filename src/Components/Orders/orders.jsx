import styles from "./orders.module.css";
import { fetchOrdersAsync } from "../../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Orders(){

    const dispatch = useDispatch();
    const myOrders = useSelector((state) => state.productReducer.myOrders);
    const ordersLoading = useSelector((state) => state.productReducer.ordersLoading);

    useEffect(()=>{
        dispatch(fetchOrdersAsync());
    },[dispatch])

    return(

        <>

        {ordersLoading ? (
                <h1>
                    Loading...
                </h1>
        ) : (

            <>  
                {myOrders ? (
                     <>
                     <div className={styles.orderPage}>
                     <h1>Your Orders</h1>
                     {myOrders.map((item, index) => (
                        <>
                         <h2>Ordered on:- {item.date}</h2>
                         <table className={styles.ordersTable}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                
                                    {item.items.map((product => (
                                        <tr>
                                        <td>{product.title}</td>
                                        <td>${product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.price}</td>
                                        </tr>
                                    )))}
                                    
                                    <tr>
                                        <td colSpan="3">Total Price:</td>
                                        <td>${item.totalPrice}</td>
                                    </tr>
                                   
                                
                                
                            </tbody>
                         </table>
                         </>

                     ))}

                </div>

                     </>
                   
                ) : (
                    <h1>
                        No Orders
                    </h1>
                    )
                }
            </>

        )}
       
        </>

    )
}

export default Orders;