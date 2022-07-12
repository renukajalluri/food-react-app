import styles from "./Checkout.module.css"
import { useRef,useState } from "react"

const isEmpty = (value)=> value.trim() === '';
const isSixChars = (value)=>value.trim().length === 6;


const Checkout = (props)=>{
  const [formInputsValidity,setFormInputsValidity] = useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
  })
  const nameInputRef = useRef();
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()
  const confirmHandler = (event)=>{

           event.preventDefault();
           const enteredName = nameInputRef.current.value;
           const enteredStreet = streetInputRef.current.value;
           const enteredPostalCode = postalCodeInputRef.current.value;
           const enteredCity = cityInputRef.current.value

           const enteredNameIsValid = !isEmpty(enteredName)
           const enteredStreetIsValid = !isEmpty(enteredStreet)
           const enteredCityIsValid = !isEmpty(enteredCity)
           const enteredPostalCodeIsValid = isSixChars(enteredPostalCode)

           setFormInputsValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalCodeIsValid,
            city:enteredCityIsValid
           })
           const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid

           if(!formIsValid){
            return;
           }
          //  submit cart data
          props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostalCode,
            city:enteredCity
          })
  }
  const nameControlClasses =  `${styles.control} ${formInputsValidity.name ? '': styles.invalid}`
  const streetControlClasses =  `${styles.control} ${formInputsValidity.street ? '': styles.invalid}`
  const postalCodeControlClasses =  `${styles.control} ${formInputsValidity.postalCode ? '': styles.invalid}`
  const cityControlClasses =  `${styles.control} ${formInputsValidity.city ? '': styles.invalid}`


     return(
     <form onSubmit={confirmHandler}>
         <div className={nameControlClasses}>
             <label htmlFor="name">Your Name</label>
             <input type="text" id="name"  ref= {nameInputRef} />
             {!formInputsValidity.name && <p >Please enter a valid name!</p>}
           </div>
           <div className={streetControlClasses}>
             <label htmlFor="street">Street</label>
             <input type="text" id="street" ref= {streetInputRef}></input>
             {!formInputsValidity.street && <p >Please enter a valid street !</p>}
           </div>
           <div className={postalCodeControlClasses}>
             <label htmlFor="postal">Postal Code</label>
             <input type="text" id="postal" ref={postalCodeInputRef}></input>
             {!formInputsValidity.postalCode && <p >Postal Code should be 6 char long</p>}
           </div>
           <div className={cityControlClasses}>
             <label htmlFor="city">City</label>
             <input type="text" id="city" ref={cityInputRef}></input>
             {!formInputsValidity.city && <p >Please enter a valid city!</p>}
           </div>
           <div className={styles.actions}>
           <button type="button" onClick={props.onCancel}>Cancel</button>
           <button className={styles.submit}>Confirm</button>
           </div>
           
     </form>
     )
}
export default Checkout