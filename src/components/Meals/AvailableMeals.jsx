import { useEffect,useState } from 'react';
import styles from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


export default function AvailableMeals(){
  const [meals,setMeals]  = useState([]);
  // true -> when this component is rendered then there  will be loading
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState();
    useEffect(()=>{
       const fetchMeals = async ()=>{
        const response  = await fetch("https://react-http-9b6c1-default-rtdb.firebaseio.com/meals.json");
          if(!response.ok){
            throw new Error('Something Went Wrong!')
          }
         const data =  await response.json()
         const loadedMeals = []

         for(const key in data){
           loadedMeals.push({
             id:key,
    // we are pulling out name from data for the given key
             name:data[key].name,
             description:data[key].description,
             price:data[key].price,
           })
         }
         setIsLoading(false)
        // expose fetched data in rest of this component
         setMeals(loadedMeals)
       };
       
          fetchMeals().catch((error)=>{
            setIsLoading(false);
            setIsError(error.message)
          
          })
      
         
       
    },[])

    if(isLoading){
      return <section className={styles.loading}>
        <p >Loading...</p>
      </section>
    }
   
    if(isError){
      return <section className={styles.error}>
        <p> {isError} </p>
      </section>
    }

    const mealsList = meals.map(meal=> 
     <MealItem 
        key={meal.id} 
        id={meal.id}
        name={meal.name}
        description={meal.description} 
        price={meal.price}
      />
        )
      
    return(
        <section className={styles.meals}>
          <Card>
            <ul>
               {mealsList}
            </ul>
            </Card>
        </section>
    )
}