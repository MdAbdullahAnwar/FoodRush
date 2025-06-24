import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch food items
  const fetchFoodItems = async () => {
    const snapshot = await getDocs(collection(db, "foods"));
    const data = snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));
    setFoodList(data);
  };

  // Load user cart
  const loadCart = async (uid) => {
    const cartRef = doc(db, "users", uid);
    const docSnap = await getDoc(cartRef);
    if (docSnap.exists()) {
      setCartItems(docSnap.data().cart || {});
    }
  };

  // Save cart to Firestore
  const saveCart = async (uid, cart) => {
    await setDoc(doc(db, "users", uid), { cart }, { merge: true });
  };

  // Clear cart completely
  const clearCart = async () => {
    try {
      setCartItems({});
      if (userId) {
        await updateDoc(doc(db, "users", userId), {
          cart: {}
        });
        console.log("Cart cleared successfully for user:", userId);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Revert state if update fails
      const cartRef = doc(db, "users", userId);
      const docSnap = await getDoc(cartRef);
      if (docSnap.exists()) {
        setCartItems(docSnap.data().cart || {});
      }
      throw error;
    }
  };

  // Auth state listener
  useEffect(() => {
    fetchFoodItems();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
        setUserId(user.uid);
        loadCart(user.uid);
      } else {
        setToken("");
        setUserId(null);
        setCartItems({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auto-save cart changes
  useEffect(() => {
    if (userId && Object.keys(cartItems).length > 0) {
      saveCart(userId, cartItems);
    }
  }, [cartItems, userId]);

  // Cart operations
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = food_list.find((f) => f._id === id);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        userId,
        loading,
        clearCart,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;