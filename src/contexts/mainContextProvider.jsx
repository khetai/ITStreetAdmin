import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );
  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishList")) || []
  );

  useEffect(() => {
    if (basket.length === 0) {
      localStorage.setItem("basket", JSON.stringify([]));
    } else {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  useEffect(() => {
    if (wishList.length === 0) {
      localStorage.setItem("wishList", JSON.stringify([]));
    } else {
      localStorage.setItem("wishList", JSON.stringify(wishList));
    }
  }, [wishList]);

  return (
    <MainContext.Provider value={[basket, setBasket, wishList, setWishList]}>
      {children}
    </MainContext.Provider>
  );
}
