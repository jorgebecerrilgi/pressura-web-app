import { useEffect, useRef } from "react";
import style from "./Modal.module.css";

const Modal = ({ open = false, className, children, onClose }) => {
    const dialog = useRef(null);

    useEffect(() => {
        if (dialog === null || dialog.current === null) return;
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [dialog, open]);

    return (
        <dialog
            ref={dialog}
            className={`${style.modal} ${className}`}
            onClose={() => onClose()}
            onClick={(e) => {
                if (e.target.tagName !== "DIALOG") return;
                onClose();
            }}
        >
            {children}
        </dialog>
    );
};

export default Modal;
