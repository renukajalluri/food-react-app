import styles from './MealItemForm.module.css'
import Input from '../../UI/Input'
import {useRef,useState} from 'react'
const MealItemForm = (props)=>{
   const [amountIsValid,setAmountIsValid] = useState(true);
   const amountInputRef = useRef()
            // console.log(amountIsValid);
            // console.log(amountInputRef);

    const submitHandler = (event)=>{
            event.preventDefault();
       
            // extracting the entered amount using refs
       const enteredAmount = amountInputRef.current.value;   
       //    console.log(enteredAmount)
       //   changing string into number by putting +
         const enteredAmountNumber = +enteredAmount;

         if(enteredAmount.trim().length === 0 ||
          enteredAmountNumber < 1 || 
          enteredAmountNumber > 5
          ){
              setAmountIsValid(false);
              return;
             }
             else{
               //  sending amount to meal item
             props.onAddToCart(enteredAmountNumber);
             }
        }
// console.log(amountInputRef)
    return(
       <form className={styles.form} onSubmit={submitHandler}>
          <Input 
              ref = {amountInputRef}
              label="Amount" 
              input={{
              id:'amount',
              type: 'number',
              min:'1',
              max:'5',
              step:'1',
              defaultValue:'0'
              }}/>
           <button>+ Add</button>
           {/* if the amount is less than 1 the this msg will be shown */}
           {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
       </form>
    )
}

export default MealItemForm