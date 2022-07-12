import { useContext,useEffect,useState } from "react"
import CartIcon from "../Cart/CartIcon"
import styles from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context"

// the header cart button component will be re-evaluated by react
// whenever the context changes(the changes when updated in cartProvider compo)

export default function HeaderCartButton(props){
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
   const cartCtx = useContext(CartContext);

   // pulling out items array from cartCtx
   const {items} = cartCtx;

   // reduce method
   // outputting num of cart items
    const numberOfCartItems = items.reduce((curNumber, item) => {
         return curNumber + item.amount;
   },0);
  
   // we can also use length instead of reduce
   // outputting num of cart items
   //  const numberOfCartItems = cartCtx.items.length;
   
   //  whenever the items added to cart the cart button will bump
   const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;
    
   useEffect(()=>{
      if(items.length === 0){
         return;
      }else{
     setBtnIsHighlighted(true);
   }
//the animation will work after 300ms for evry dependency changes
// after that again the setBtnIsHighlighted is false 
 
   const timer =  setTimeout(()=>{
        setBtnIsHighlighted(false)
     },300);
     return ()=>{
      clearTimeout(timer);
     }
     
   },[items]);
   // console.log(items)
    return(
       <button onClick={props.onClick} className={btnClasses}>
           <span className={styles.icon}>
              <CartIcon/>
           </span>
           <span>Your Cart</span>
           <span className={styles.badge}>{numberOfCartItems}</span>
       </button>
    )
}