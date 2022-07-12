import { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM from 'react-dom';

const Backdrop = props=>{
  return <div className={styles.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = props=>{
  return (<div className={styles.modal}>
    <div className={styles.content}>{props.children}</div>
  </div>)
}
const idElement = document.getElementById('overlays');

export default function Modal(props){
  return(
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,idElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,idElement)}
    </Fragment>
  )
}