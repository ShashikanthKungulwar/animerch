// Import necessary styles and dependencies
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { databaseSelector,addTocart } from "../../redux/reducers/databaseReducer";
import { useDispatch, useSelector } from "react-redux";
// Define the Card component
export default function Card({ item }) {
  const { isLoggedIn } = useSelector(databaseSelector);

  const dispatch=useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  // Access the `navigate` function from React Router
  const navigate = useNavigate();

  // Render the card component
  return (
    <div className={styles.card}>
      {/* Display the item's image */}
      <img src={item.image} alt="item" />

      <div>
        {/* Display the item's title */}
        <p>{item.title}</p>

        {/* Display the item's price */}
        <span>&#x20B9;{item.price * 100}</span>

        {/* Render the "Add to Cart" button with conditional behavior */}
        <button
          className={styles.add}
          onClick={() => {
            if (isLoggedIn) {
              // If user is logged in, set "isAdding" to true and add the item to the cart
              setIsAdding(true);
              // Call the `addTocart` function and handle the promise
              dispatch(addTocart(item))
                .then(() => setIsAdding(false)) // Once added, set "isAdding" back to false
                .catch((error) => {
                  console.error("Error adding item to cart:", error);
                  setIsAdding(false); // Set "isAdding" to false in case of an error
                });
            } else {
              // If user is not logged in, navigate to the login page
              navigate("login");
            }
          }}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
