import React from 'react'
import { useModalDataLayer } from '../../contexts/ModalContext';
import './Modal.css'

const Modal = () => {

    const [{ isModalOpen, modalContent }, dispatch] = useModalDataLayer();
    console.log(isModalOpen)
    return (

        isModalOpen && (<div className="modal">
            <p className="modalContent">{modalContent}</p>
        </div>)

    )
}

export default Modal
