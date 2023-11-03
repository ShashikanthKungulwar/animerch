import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./MyOrders.module.css";
import { databaseSelector, getCartItemsOrders } from "../../redux/reducers/databaseReducer";

/**
 * Component for displaying user's orders.
 */
export default function MyOrders() {
    // Select orders and user data from the Redux store.
    const { orders } = useSelector(databaseSelector);
    const { user } = useSelector(databaseSelector);
    const dispatch = useDispatch();

    // Fetch user's orders when the user changes.
    useEffect(() => {
        if (user) {
            dispatch(getCartItemsOrders());
        }
    }, [user]);

    return (
        <div className={styles.ordersContainer}>
            {orders.length ? (
                <>
                    <h1>Your Orders</h1>
                    {orders.map((order) => <Table key={order.id} order={order} />)}
                </>
            ) : (
                <h1>No orders found</h1>
            )}
        </div>
    );
}

/**
 * Component for displaying a table of items in an order.
 * @param {object} order - The order object containing order details.
 */
function Table({ order }) {
    // Extract the items in the order and convert them into an array.
    const cartArray = Object.values(order.cart);

    return (
        <div className={styles.orders}>
            <h2>Ordered On: {order.date}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartArray.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.price * 100}</td>
                            <td>{item.qty}</td>
                            <td>{item.price * item.qty * 100}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className={styles.last}>
                        <td colSpan={4} style={{ textAlign: "right", padding: "0px" }}>
                            <span style={{ padding: "5px 50px" }}>
                                ₹{order.totalPrice}
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
