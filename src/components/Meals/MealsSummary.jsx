import styles from './MealsSummary.module.css'


export default function MealsSummary(){
  return(
      <>
         
     <section className={styles.summary}>
   <p>Choose your favorite meal from our <span className={styles.spcl}> broad selection </span>of available meals
        and enjoy a delicious lunch or dinner at home.</p>
      <p>
        All our meals are cooked with <span className={styles.spcl}> high-quality ingredients </span>, just-in-time and
        of course by experienced chefs!
      </p>
     </section>
     </>
  )
};

