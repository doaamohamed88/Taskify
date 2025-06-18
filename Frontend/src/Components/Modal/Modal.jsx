import styles from './Modal.module.css'
import { createPortal } from "react-dom";

import { useRef, useImperativeHandle, forwardRef } from 'react'
const Modal = forwardRef(function Modal(props, ref) {
    const modalRef = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close();
        }
    }))
    return createPortal(
        <dialog ref={modalRef} className={`${styles.modal} ${props.widthGrow && styles.widthGrow}`}>
            {props.children}
        </dialog>, document.getElementById('root')
    )
})

export default Modal;
