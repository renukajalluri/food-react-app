
import React from "react";

const CartContext = React.createContext({
    // used for auto completion where ever we used
    items:[],
    totalAmount:0,
    addItems:(item)=>{},
    removeItems:(id)=>{},
    clearCart : ()=>{}
});

export default CartContext;