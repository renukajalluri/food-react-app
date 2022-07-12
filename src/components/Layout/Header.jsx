import React from "react";
import styles from "./Header.module.css"
import mealsImage from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";
import {BiRestaurant} from "react-icons/bi"

export default function Header(props){
    return(
        <React.Fragment>
    <header className={styles.header}  style={{backgroundImage:`url(${mealsImage})`}} >
        <div className={styles.nav}>   
            <h1 className={styles.logo}>
        <span className={styles.resto}><BiRestaurant/></span>
            Foodie Hunter
            </h1>     
            <HeaderCartButton onClick ={props.onShowCart}/>
        </div>

    </header>
    <h3 className={styles.sub}>Delicious Food, Delivered To You</h3>
        </React.Fragment>
    )
}