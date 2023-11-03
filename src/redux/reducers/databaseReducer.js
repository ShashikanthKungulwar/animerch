import { db } from "../../firebaseInit";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { toast } from "react-toastify";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const INITIAL_STATE = {
  cart: [],
  orders: [],
  user: null,
  isLoggedIn: false,
}

//persitance setter for browser
export const authAsyc = createAsyncThunk(
  "user-authentication",
  (_, thunkApi) => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted locally.

        // This should be replaced with actual user authentication logic.
        // For example, you might check if a user is already signed in.
        // If not, you can handle it accordingly.

        // Example of checking if a user is already signed in:
        const user = auth.currentUser;
        if (user) {
          // User is already signed in.
          thunkApi.dispatch(databaseActions.setIsLoggedIn(true));
          thunkApi.dispatch(databaseActions.setUser({ email: user.email }));
        } else {
          // User is not signed in.
        }
      })

  }
)


//async thunk to handle adding new cart to fiestore db
export const addTocart = createAsyncThunk(
  "addtocart",
  async (item, thunkApi) => {
    const { user } = databaseSelector(thunkApi.getState());

    const docRef = doc(db, `users/${user.email}/cart`, item.id.toString());
    const itemDoc = await getDoc(docRef);
    if (itemDoc.exists()) {
      setDoc(docRef, { ...item, qty: parseInt(itemDoc.data().qty) + 1 })
      return;
    }
    await setDoc(docRef, { ...item, qty: 1 });
    toast("Added to Cart");
  }
)

//funciton to increase qty of the item
export const handleIncrease = createAsyncThunk(
  "increseItemQty",
  async (item, thunkApi) => {
    const { user } = databaseSelector(thunkApi.getState());
    const docRef = doc(db, `users/${user.email}/cart`, item.id.toString());
    let IncreaseItem = await getDoc(docRef);
    IncreaseItem = IncreaseItem.data();
    IncreaseItem.qty = parseInt(IncreaseItem.qty + 1);
    // console.log(IncreaseItem);
    await setDoc(docRef, IncreaseItem);
  }
)
//function to handle purhase the whole cart
export const handlePurchase = createAsyncThunk(
  "purchase",
  async (purchaseCost, thunkApi) => {
    async function emptyCart() {
      const cartCollectionRef = collection(db, `users/${user.email}/cart`);

      // Get all documents in the "cart" collection
      const querySnapshot = await getDocs(cartCollectionRef);

      // Delete each document in the "cart" collection
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }
    const { user, cart } = databaseSelector(thunkApi.getState());
    const date = new Date().toISOString();
    const docRef = doc(db, `users/${user.email}/orders`, date);
    await setDoc(docRef, { id: date, date: date.slice(0, 10), cart: { ...cart }, totalPrice: purchaseCost });
    toast("purchase succesful")
    emptyCart();
  }


);


//to remove item from cart
export const handleRemove = createAsyncThunk(
  "removeItem",
  async (item, thunkApi) => {
    const { user } = databaseSelector(thunkApi.getState());
    const docRef = doc(db, `users/${user.email}/cart`, item.id.toString());
    await deleteDoc(docRef);
    toast("removed succesfully")
  }
);
// to reduce the qty of item in cart
export const handleReduce = createAsyncThunk(
  "reduceItemqty",
  async (item, thunkApi) => {
    const { user } = databaseSelector(thunkApi.getState());
    const docRef = doc(db, `users/${user.email}/cart`, item.id.toString());
    let IncreaseItem = await getDoc(docRef);
    IncreaseItem = IncreaseItem.data();
    if (IncreaseItem.qty <= 1) {
      thunkApi.dispatch(handleRemove(item));
      return;
    }
    IncreaseItem.qty = parseInt(IncreaseItem.qty - 1);
    await setDoc(docRef, IncreaseItem);
  }
)


//to sign up for new user
export const createUser = createAsyncThunk(
  "usercreation",
  ({ email, pass, name }, thunkApi) => {
    console.log(email, pass, name);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        userCredential.user.displayName = name;
     
        thunkApi.dispatch(databaseActions.setIsLoggedIn(true));
        thunkApi.dispatch(databaseActions.setUser({ email: user.email }));
        toast("Sing In succesful")
      })
      .catch((error) => {
      
        console.log(error.message);
      });
  }
)


//login for already exist user
export const loginUser = createAsyncThunk(
  "loginUser",
  (data, thunkApi) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        thunkApi.dispatch(databaseActions.setIsLoggedIn(true));
        thunkApi.dispatch(databaseActions.setUser({ email: user.email }));
        toast("log In succesful")
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        toast("Invalid credential please check");
      });
  }
);


//logout for user
export const logOutUser = createAsyncThunk(
  "logoutUser",
  (data, thunkApi) => {
    const auth = getAuth();
    signOut(auth).then(() => {
      thunkApi.dispatch(databaseActions.setIsLoggedIn(false));
      thunkApi.dispatch(databaseActions.setUser(null));
      toast("log out succesful")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      toast("cant sign out please check");
    });
  }
)

//realtime updation of cart and orders
export const getCartItemsOrders = createAsyncThunk(
  "cart-of-user",
  (_, thunkApi) => {
    const { user } = databaseSelector(thunkApi.getState());
    const unsub = onSnapshot(collection(db, `users/${user.email}`, "cart"), (snapshot) => {
      // console.log(snapshot.docs)
      const data = snapshot.docs.map((doc) => doc.data())
      thunkApi.dispatch(databaseActions.setCartItems(data));
    })



    const unsub1 = onSnapshot(collection(db, `users/${user.email}`, "orders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      thunkApi.dispatch(databaseActions.setOrders(data));
      // console.log(data);
    })
  }
)

// data slice for database
const databaseSlice = createSlice({
  name: "databaseSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCartItems: (state, action) => {
      state.cart = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    }
  }
})


export const databaseReducer = databaseSlice.reducer;
export const databaseActions = databaseSlice.actions;
export const databaseSelector = (state) => state.databaseReducer;
