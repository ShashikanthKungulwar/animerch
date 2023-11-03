import styles from "./NavBar.module.css";
import logo from "../../images/logo.jpg";
import cart from "../../images/cart.png";
import box from "../../images/box.png";
import house from "../../images/house.png";
import sIn from "../../images/signIn.png";
import sOut from "../../images/signOut.png";
import { Link, Outlet } from "react-router-dom";
// import { useAuthValue, useValue } from "../../context";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { databaseSelector , authAsyc,logOutUser} from "../../redux/reducers/databaseReducer";
export default function NavBar() {
  // Destructure properties from useValue() and useAuthValue()
  const { isLoggedIn } = useSelector(databaseSelector);
  const dispatch=useDispatch();
  // const { logOutUser } = useAuthValue();
  useEffect(()=>{
    dispatch(authAsyc())
},[])
  // Define signInOrOutText based on isLoggedIn
  const signInOrOutText = isLoggedIn ? "Sign Out" : "Sign In";

  // Define links based on isLoggedIn
  const links = isLoggedIn ? (
    <>
      <Link to="/cart">
        <img src={cart} alt="cart" /> &nbsp;Cart
      </Link>
      <Link to="/orders">
        <img src={box} alt="my-orders" /> &nbsp;Orders
      </Link>
    </>
  ) : null;

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <span>
            <img src={logo} alt="logo" />
            <h1>flexy merch</h1>
          </span>
          <span>
            <Link to="/">
              <img src={house} alt="home" /> &nbsp;Home
            </Link>
            {links}
            <Link
              to={isLoggedIn ? "/" : "/login"}
              onClick={() => {
                if (isLoggedIn) {
                  console.log(isLoggedIn);
                  dispatch(logOutUser());
                }
              }}
            >
              <img src={isLoggedIn ? sOut : sIn} alt="signIn/out" /> &nbsp;{" "}
              {signInOrOutText}
            </Link>
          </span>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
