import React from "react";
import CartContext from "./cart-context";
import { useReducer } from "react";

// initialState 
const defaultCartState = {
    items:[],
    totalAmount:0
}


// state->the last state snapshot
const  cartReducer = (state,action)=>{
   
    // console.log(action.item.price)
    if(action.type === 'ADD'){  
        const totalPrice = action.item.price * action.item.amount;                     
        const updatedTotalAmount = state.totalAmount + totalPrice;
       
    // checking the item is exists or not
    // if the item, we are currently looking at in that array has same id as the item we are adding with this action we dispatched 
    const existingCartItemIndex = state.items.findIndex(
        (item)=>item.id === action.item.id);

//    console.log(existingCartItemIndex);
// console.log(action.item.id)
        // if the item is doesn't exist the existingCartItem is null
    const existingCartItem = state.items[existingCartItemIndex];
    // console.log(existingCartItem)
    let updatedItems;

    // if the item is already a part of array
    if(existingCartItem){
      const updatedItem ={
            ...existingCartItem,
            // already existing item amount and newly adding item amount
            amount:existingCartItem.amount + action.item.amount
        }
        updatedItems = [...state.items];
        // console.log(updatedItems);

        // for existing cartItemIndex,overwriting this with updateItem
    //    picking old item which we identified in cart item array and overwrite it with this
    // updatedItem
        updatedItems[existingCartItemIndex]= updatedItem;
        // console.log(updatedItems)
    }else{
    // concat doesn't edit the existing array, return the new array
        updatedItems = state.items.concat(action.item);
    }                
      return {
          items:updatedItems,
          totalAmount:updatedTotalAmount
      }
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            (item)=>item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            // checking all item id's with action id,if not equal it will kept
           updatedItems = state.items.filter(item =>item.id !== action.id );
        }else{
           const updatedItem = {...existingItem,amount:existingItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }   

    if(action.type === 'CLEAR'){
        return  defaultCartState
           }

       return defaultCartState;
}


// the use of this compo is to manage the cart context data
// provide that context data to all components that want access to it
const CartProvider = props=>{
   const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
//    console.log(cartState);

// getting item array from mealItem and that array senting to reducer function
   const addItemToCartHandler = item=>{
        dispatchCartAction({
            type:'ADD',
            item:item
        })
        // console.log(item.price);
    };
  
    //  console.log(cartState);
    const removeItemFromCartHandler = id=>{
        dispatchCartAction({
            type:'REMOVE',
            id:id
        })
    };
    // console.log(cartState.items);
// console.log(cartSate)
//  console.log(cartState.totalAmount);
      
     const clearCartHandler = ()=>{
        dispatchCartAction({type:"CLEAR"})
     }


    const cartContext ={
        
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItems:addItemToCartHandler,
        removeItems:removeItemFromCartHandler,
        clearCart : clearCartHandler
    }
    // console.log(cartContext)
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}



export default CartProvider