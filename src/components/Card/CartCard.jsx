import styles from "./Card.module.css";
import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import { useDispatch } from "react-redux";
import {handleIncrease,handleReduce,handleRemove } from "../../redux/reducers/databaseReducer";
export default function CartCard({item})
{
    // const {handleReduce,handleRemove}=useAuthValue();
    const dispatch=useDispatch();
    if(!item.id)
    {
        return null;
    }
    return(
        <div className={styles.card}>
            <img src={item.image} alt="item"/>
            <div>
                <p>{item.title}</p>
                <span>&#x20B9; {item.price*100} <span><img src={minus} alt="minus" onClick={()=>{dispatch(handleReduce(item))}} /> {item.qty} <img src={plus} alt="plus" onClick={()=>dispatch(handleIncrease(item))}/> </span></span>
                <button className={styles.remove} onClick={()=>{dispatch(handleRemove(item))}}>Remove from the cart</button>
            </div>
        </div>
    )
}