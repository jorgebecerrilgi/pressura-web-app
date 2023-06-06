"use client";

import { useContext, useEffect, useState } from "react";
import Modal from "../../Modal";
import styles from "./ModalAddPatient.module.css";
import Tab from "./Tab";
import InputElement from "./InputElement";
import RequestItem from "./RequestItem";
import { AppContext } from "@/app/ContextProvider";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/firebase";

const fetchRequests = async (doctorEmail) => {
    const col = collection(db, "PacienteConDoctores");
    const snap = await getDocs(query(col, where("IDDoctor", "==", doctorEmail), where("Relacion", "==", 1)));
    return snap.docs;
};

const createRequest = async (doctorEmail, patientEmail, doctorUID) => {
    const col = collection(db, "PacienteConDoctores");
    const snap = await getDocs(
        query(col, where("IDDoctor", "==", doctorEmail), where("IDPaciente", "==", patientEmail))
    );
    if (snap.size > 0) {
        throw new Error("La solicitud que intentas crear ya existe.");
    }
    const doctorDocRef = doc(db, "Doctor", doctorUID);
    const doctorSnap = await getDoc(doctorDocRef);
    if (!doctorSnap.exists()) {
        throw new Error("No se pudo encontrar la información del Doctor de la sesión actual.");
    }
    const doctorName = doctorSnap.data().Nombre || "Sin Nombre";
    try {
        await addDoc(col, {
            IDDoctor: doctorEmail,
            IDPaciente: patientEmail,
            NombreDoctor: doctorName,
            NombrePaciente: "",
            Relacion: 2,
        });
    } catch (err) {
        throw new Error("Hubo un error al crear la solicitud en la base de datos.");
    }
};

const ModalAddPatient = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [patientID, setPatientID] = useState("");
    const [requests, setRequests] = useState([]);
    const { account } = useContext(AppContext);

    useEffect(() => console.log(patientID), [patientID]);

    // Fetches requests.
    useEffect(() => {
        if (account === null || open === false) return;
        const fetchData = async () => {
            const requestsArr = await fetchRequests(account.email);
            setRequests(requestsArr);
        };
        fetchData();
    }, [account, open]);

    // Resets to Tab 1 when closed.
    useEffect(() => {
        setTabIndex(0);
        setPatientID("");
    }, [open]);

    const handleOnCreateRequest = async (e) => {
        e.preventDefault();
        if (account === null || patientID === "") return;
        try {
            await createRequest(account.email, patientID, account.uid);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal className={styles.addPatientCard} open={open} onClose={onClose}>
            <ul className={styles.listSections}>
                <li className={tabIndex === 0 ? styles.selected : ""}>
                    <button type="button" onClick={() => setTabIndex(0)}>
                        Crear Nuevo
                    </button>
                </li>
                <li className={tabIndex === 1 ? styles.selected : ""}>
                    <button type="button" onClick={() => setTabIndex(1)}>
                        Solicitudes
                    </button>
                </li>
            </ul>
            <div className={styles.addPatientBody}>
                <Tab index={0} currentIndex={tabIndex}>
                    <form onSubmit={handleOnCreateRequest}>
                        <InputElement
                            title="Correo Electrónico (Paciente)"
                            value={patientID}
                            onChange={(e) => setPatientID(e.target.value)}
                        />
                        <ul className={styles.listButtons}>
                            <li className={styles.buttonCreate}>
                                <button type="submit">Crear</button>
                            </li>
                            <li className={styles.buttonCancel} onClick={() => onClose()}>
                                <button type="button">Cancelar</button>
                            </li>
                        </ul>
                    </form>
                </Tab>
                <Tab index={1} currentIndex={tabIndex}>
                    {requests.length > 0 ? (
                        requests.map((requestDoc) => {
                            const request = requestDoc.data();
                            return (
                                <RequestItem
                                    key={request.IDPaciente}
                                    name={request.NombrePaciente}
                                    email={request.IDPaciente}
                                    docID={requestDoc.id}
                                />
                            );
                        })
                    ) : (
                        <p style={{ color: "grey", textAlign: "center" }}>No existen solicitudes, actualmente.</p>
                    )}
                </Tab>
            </div>
        </Modal>
    );
};

export default ModalAddPatient;
