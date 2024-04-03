import useProduct from "../../context/productContext";
import styles from "./orders.module.css";

function Orders(){

    const {myOrders, ordersLoading} = useProduct();
    console.log(myOrders);
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
                     {myOrders.map((item => (
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
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price}</td>
                                        </tr>
                                    )))}
                                    
                                    <tr>
                                        <td colSpan="3">Total Price:</td>
                                        <td>{item.totalPrice}</td>
                                    </tr>
                                   
                                
                                
                            </tbody>
                         </table>
                         </>

                     )))}

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