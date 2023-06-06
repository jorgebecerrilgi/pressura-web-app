"use client";

import { useContext, useState } from "react";
import styles from "./RequestItem.module.css";
import ModalConfirm from "@/components/ModalConfirm";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/src/firebase";
import { AppContext } from "@/app/ContextProvider";

const RequestAction = {
    Accept: 0,
    Deny: 1,
};

const fetchDoctorName = async (doctorUID) => {
    const doctorDocRef = doc(db, "Doctor", doctorUID);
    const doctorSnap = await getDoc(doctorDocRef);
    if (!doctorSnap.exists()) {
        throw new Error("No se pudo encontrar la información del Doctor de la sesión actual.");
    }
    return doctorSnap.data().Nombre || "Sin Nombre";
};

const acceptRequest = async (requestID, doctorName) => {
    const docRef = doc(db, "PacienteConDoctores", requestID);
    try {
        await updateDoc(docRef, { Relacion: 3, NombreDoctor: doctorName });
    } catch (err) {
        throw new Error("No se pudo actualizar el documento de la solicitud.");
    }
};

const deleteRequest = async (requestID) => {
    const docRef = doc(db, "PacienteConDoctores", requestID);
    try {
        await deleteDoc(docRef);
    } catch (err) {
        throw new Error("No se pudo eliminar el documento de la solicitud");
    }
};

const RequestItem = ({ name, email, docID }) => {
    const [action, setAction] = useState(null);
    const { account } = useContext(AppContext);

    const modalTitle = action === RequestAction.Accept ? "Aceptar solicitud" : "Eliminar solicitud";
    const modalText =
        action === RequestAction.Accept
            ? "¿Estás seguro que quieres aceptar la solicitud?"
            : "¿Estás seguro que quieres eliminar la solicitud?";
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
        } catch (err) {
            console.error(err);
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
