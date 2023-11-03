import { useEffect, useRef } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { databaseSelector,createUser } from "../../redux/reducers/databaseReducer";
export default function SignUp()
{
    const {isLoggedIn}=useSelector(databaseSelector);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const nameRef=useRef();
    const emailRef=useRef();
    const passRef=useRef();
    
    
    useEffect(()=>{
        if(isLoggedIn)
        {
            setTimeout(()=>{
                navigate("/");
            },800)
        }
    },[isLoggedIn]);

    function handleSubmit(e)
    {
        e.preventDefault();
        if(passRef.current.value.length<8)
        {
            toast("password length must be more then 8")
            return;
        }
        dispatch(createUser({email:emailRef.current.value,pass:passRef.current.value,name:nameRef.current.value}));
    }


    return( 
        <div className={styles.signup}>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input placeholder='Enter Name' required ref={nameRef} />
                <input placeholder='Enter Email' required type="email" ref={emailRef} />
                <input placeholder='Enter Passwod' required type="password" ref={passRef} />
                <button>SIgn Up</button>
            </form>
        </div>
    )
}