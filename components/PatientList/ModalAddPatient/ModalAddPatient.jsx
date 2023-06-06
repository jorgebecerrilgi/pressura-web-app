"use client";

import { useEffect, useState } from "react";
import Modal from "../../Modal";
import styles from "./ModalAddPatient.module.css";
import Tab from "./Tab";
import InputElement from "./InputElement";
import RequestItem from "./RequestItem";

const ModalAddPatient = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [patientID, setPatientID] = useState("");
    const [requests, setRequests] = useState([]);

    useEffect(() => setTabIndex(0), [open]);

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
                    <form>
                        <InputElement
                            title="Correo Electrónico (Paciente)"
                            input={patientID}
                            onChangeValue={setPatientID}
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
                        requests.map((request) => {
                            return (
                                <RequestItem
                                    key={request.id}
                                    name={request.name}
                                    email={request.id}
                                    onAccept={() => {}}
                                    onDeny={() => {}}
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
