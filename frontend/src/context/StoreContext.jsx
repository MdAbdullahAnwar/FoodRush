import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const fetchFoodItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "foods"));
      const fetchedItems = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setFoodList(fetchedItems);
    } catch (err) {
      console.error("Failed to fetch food items:", err);
    }
  };

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
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((f) => f._id === itemId);
      if (item) total += item.price * cartItems[itemId];
    }
    return total;
  };

  useEffect(() => {
    fetchFoodItems(); // Load food items on mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
        localStorage.setItem("token", user.accessToken);
      } else {
        setToken("");
        localStorage.removeItem("token");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        setCartItems,
        food_list,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
