import styles from "./ModalConfirm.module.css";
import Modal from "./Modal";

const ModalConfirm = ({ open, title, confirmLabel, cancelLabel, onAccept, onCancel, onClose, children }) => {
    return (
        <Modal className={styles.modalConfirm} open={open} onClose={onClose}>
            <div className={styles.confirmBody}>
                <h2>{title}</h2>
                {children}
            </div>
            <ul className={styles.buttons}>
                <li className={styles.buttonConfirm} onClick={() => onAccept()}>
                    <button type="button">{confirmLabel || "Aceptar"}</button>
                </li>
                <li className={styles.buttonCancel} onClick={() => onCancel()}>
                    <button type="button">{cancelLabel || "Cancelar"}</button>
                </li>
            </ul>
        </Modal>
    );
};

export default ModalConfirm;
