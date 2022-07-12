import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import { useContext } from 'react'
import CartContext from '../../../store/cart-context';


export default function MealItem(props){
    // console.log(props);
  const cartCtx = useContext(CartContext);
   
    // first $-> output the character dollar sign
    // ${}-> js syntax for dynamic content
    // toFixed(2) -> two decimal places
    const price = `$${props.price.toFixed(2)}`
     

    const addToCartHandler = amount=>{
        // we passing id ,name,price,amount of that item we clicked in input  to cartProvider 
        cartCtx.addItems({
               id:props.id,
               name:props.name,
               amount:amount,
               price:props.price
               
           })
        //    console.log(props.id);
    }
// console.log(cartCtx);
    return(
        <li className={styles.meal}>
            <div>
           
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
            <MealItemForm id={props.id} onAddToCart = {addToCartHandler}/>
            </div>
        </li>
    )
}