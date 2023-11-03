import styles from "./Cart.module.css";
import CartCard from "../../components/Card/CartCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { databaseSelector,getCartItemsOrders,handlePurchase } from "../../redux/reducers/databaseReducer";
import { useEffect, useState } from "react";

export default function Cart() {
    const {cart,user}=useSelector(databaseSelector);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [purchaseCost,setPurchaseCost]=useState(0);
    useEffect(()=>{
        if(user)
        dispatch(getCartItemsOrders());
    },[user]);

    useEffect(()=>{
        const pc=cart.reduce((acc,cur)=>{return acc+parseFloat(cur.price)*parseInt(cur.qty)*100},0);
        setPurchaseCost(pc);
    },[cart]);

    return (
        <div className={styles.cart}>

            {cart.length?
            <>
            <aside>
                    <h3>Total Price :&#8377;{purchaseCost}/-</h3>
                    <button onClick={()=>{dispatch(handlePurchase(purchaseCost));navigate("/orders")}}>purchase</button>
            </aside>
            <main>
                {cart.map((item)=>{
                    return(<CartCard item={item} key={item.id*100} />)
                })};
            </main>
            </>
            :<center><h2>Cart is Empty!</h2></center>}
            

        </div>
            
    )
}