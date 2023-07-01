"use client";

import { useContext, useState } from "react";
import styles from "./RequestItem.module.css";
import ModalConfirm from "@/components/ModalConfirm";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/src/firebase";
import { AppContext } from "@/app/ContextProvider";
import { toast } from "react-hot-toast";

const RequestAction = {
    Accept: 0,
    Deny: 1,
};

const fetchDoctorName = async (doctorUID) => {
    const doctorDocRef = doc(db, "Doctor", doctorUID);
    const doctorSnap = await getDoc(doctorDocRef);
    if (!doctorSnap.exists()) {
        throw new Error("Hubo un problema con tu sesión. Recarga la página e inténtalo de nuevo.");
    }
    return doctorSnap.data().Nombre || "Sin Nombre";
};

const acceptRequest = async (requestID, doctorName) => {
    const docRef = doc(db, "PacienteConDoctores", requestID);
    try {
        await updateDoc(docRef, { Relacion: 3, NombreDoctor: doctorName });
    } catch (err) {
        throw new Error("Hubo un problema al aceptar la solicitud. Inténtalo de nuevo.");
    }
};

const deleteRequest = async (requestID) => {
    const docRef = doc(db, "PacienteConDoctores", requestID);
    try {
        await deleteDoc(docRef);
    } catch (err) {
        throw new Error("Hubo un problema al eliminar la solicitud. Inténtalo de nuevo.");
    }
};

const RequestItem = ({ name, email, docID, onResolved }) => {
    const [action, setAction] = useState(null);
    const { account } = useContext(AppContext);

    const modalTitle = action === RequestAction.Accept ? "Aceptar solicitud" : "Eliminar solicitud";
    const modalText =
        action === RequestAction.Accept
            ? `¿Estás seguro que quieres aceptar la solicitud de ${name}?`
            : `¿Estás seguro que quieres eliminar la solicitud de ${name}?`;
    const modalConfirmLabel = action === RequestAction.Deny ? "Eliminar" : null;

    const handleOnConfirm = async (accept) => {
        try {
            const doctorName = await fetchDoctorName(account.uid);
            if (accept) {
                await acceptRequest(docID, doctorName);
            } else {
                await deleteRequest(docID);
            }
            close();
            onResolved();
            toast.success(`Solicitud ${accept ? "aceptada" : "eliminada"} correctamente.`);
        } catch (err) {
            toast.error(err.message);
        }
    };
    const close = () => {
        setAction(null);
    };

    return (
        <>
            <div className={styles.requestItem}>
                <div className={styles.data}>
                    <p>{name}</p>
                    <p className={styles.dataEmail}>{email}</p>
                </div>
                <ul>
                    <li>
                        <button onClick={() => setAction(RequestAction.Deny)}>
                            <img className={styles.deny} src="icon-no.svg" />
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setAction(RequestAction.Accept)}>
                            <img className={styles.accept} src="icon-yes.svg" />
                        </button>
                    </li>
                </ul>
            </div>
            {action !== null && (
                <ModalConfirm
                    open
                    title={modalTitle}
                    confirmLabel={modalConfirmLabel}
                    onAccept={() => handleOnConfirm(action === RequestAction.Accept)}
                    onCancel={close}
                    onClose={close}
                >
                    {modalText}
                </ModalConfirm>
            )}
        </>
    );
};

export default RequestItem;
