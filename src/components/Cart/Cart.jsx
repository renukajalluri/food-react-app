import React, { useContext,useState } from 'react'
import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart(props){
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext); 
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;
    
     
    const cartItemRemoveHandler =(id)=>{
              cartCtx.removeItems(id);
    }
    const cartItemAddHandler = (item)=>{
          cartCtx.addItems({...item,amount:+1})
    }
  
    
    const orderHandler = ()=>{
            setIsCheckout(true);
    }
     
    const submitOrderHandler = async (userData)=>{
        setIsSubmitting(true)
        await  fetch('https://react-http-9b6c1-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
          });
          setIsSubmitting(false);
          setDidSubmit(true);
          cartCtx.clearCart();
    }

     const cartItems = <ul className={styles['cart-items']}>
       {cartCtx.items.map((item)=>
           <CartItem 
           key={item.id} 
           name={item.name} 
           amount={item.amount} 
           price={item.price}
        //bind-> allows you to pre-arrange the argument that function will recieve when its being executed
           onRemove={cartItemRemoveHandler.bind(null,item.id)}
           onAdd = {cartItemAddHandler.bind(null,item)}
           />
     ) }
   </ul>

   const modalActions = <div className={styles.actions}>
   <button className={styles['button--alt']} onClick={props.onClose}>
       Close
   </button>
   {hasItems && <button className={styles.button} onClick={orderHandler}  >Order</button>}
  </div>

  const cartModalContent =( <React.Fragment>
    {/* we have to display cart items */}
    {cartItems}
           <div className={styles.total}>
               <span>Total Amount</span>
               <span>{totalAmount}</span>
           </div>
       {isCheckout && <Checkout onConfirm = {submitOrderHandler} onCancel = {props.onClose}/>}
           {!isCheckout && modalActions}
  </React.Fragment>)
 
 const isSubmittingModalContent = <p>Sending Order data...</p>
 const didSubmitModalContent = <React.Fragment>
    <p>The order was successfull!</p>
    <div className={styles.actions}>
   <button className={styles['button']} onClick={props.onClose}>
       Close
   </button>
   </div>

 </React.Fragment>
   return(
       <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
   
           </Modal>
       
   )  
}