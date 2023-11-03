import styles from './LogIn.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect,useRef } from 'react';
import { databaseSelector,loginUser } from '../../redux/reducers/databaseReducer';
import { useDispatch,useSelector } from 'react-redux';
export default function LogIn()
{
    const {isLoggedIn}=useSelector(databaseSelector);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const {loginUser}=useAuthValue();
    const emailRef=useRef();
    const passRef=useRef();
    useEffect(()=>{
        if(isLoggedIn)
        {
            setTimeout(()=>{
                navigate("/");
            },800) 
        }
    },[isLoggedIn])



    function handleLogin(e)
    {
        e.preventDefault();
        dispatch(loginUser({email:emailRef.current.value,pass:passRef.current.value}));
    }


    return(
        <div className={styles.login}>
            <form onSubmit={handleLogin}>
                <h1>Sign In</h1>
                <input placeholder='Enter Email' required type='email' ref={emailRef}/>
                <input placeholder='Enter Passwod' required  type='password' ref={passRef}/>
                <button>SIgn In</button>
                <Link to="/signup"><span>Or SignUp insted</span></Link>
            </form>
        </div>
    )
}