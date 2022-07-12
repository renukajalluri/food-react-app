import React from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartShown,setIsCartShown] = useState(false);

  const showCartHandler = ()=>{
    setIsCartShown(true);
  }

  const hideCartHandler =()=>{
    setIsCartShown(false);
  }
  return (
    // cart data changes is needed for all components.so CartProvider is wrapped
   <CartProvider>
    {isCartShown  && <Cart onClose={hideCartHandler}/>}
    <Header onShowCart={showCartHandler}/>
     <main>
         <Meals/>
     </main>
    </CartProvider>
  );
}

export default App;
