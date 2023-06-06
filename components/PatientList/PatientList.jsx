"use client";

import style from "./PatientList.module.css";
import Card from "../Card";
import PatientItem from "./PatientItem";
import SearchBar from "./SearchBar";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/firebase";
import ModalAddPatient from "./ModalAddPatient/ModalAddPatient";
import { AppContext } from "@/app/ContextProvider";

const fetchPatients = async (doctorEmail, search) => {
    const col = collection(db, "PacienteConDoctores");
    const constraints = [where("IDDoctor", "==", doctorEmail), where("Relacion", "==", 3)];
    // Queries all patients if search bar is empty.
    if (search === "") {
        var snap = await getDocs(query(col, ...constraints));
    }
    // Queries patients starting with search.
    else {
        var snap = await getDocs(
            query(
                col,
                ...constraints,
                where("NombrePaciente", ">=", search),
                where("NombrePaciente", "<", search + "\uf8ff")
            )
        );
    }
    return snap.docs.map((doc) => doc.data());
};

const PatientList = ({}) => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalAdd, setIsModalAdd] = useState(false);
    const { account, shouldPatientListUpdate, updateData } = useContext(AppContext);

    // Fetches the patients.
    const fetchPatientsWrapper = () => {
        if (account === null) return;
        const fetchData = async () => {
            const patientsArr = await fetchPatients(account.email, search);
            setPatients(patientsArr);
        };
        fetchData();
    };
    // Refetches when the search query is changed.
    useEffect(() => {
        fetchPatientsWrapper();
    }, [account, search]);
    // Refetches when it receives a signal.
    useEffect(() => {
        if (!shouldPatientListUpdate) return;
        updateData("shouldPatientListUpdate", false);
        fetchPatientsWrapper();
    }, [shouldPatientListUpdate]);

    return (
        <Card className={style.patientList}>
            <SearchBar onClickSearch={setSearch} onClickAdd={() => setIsModalAdd(true)} />
            <div className={style.items}>
                {patients.map((patient) => {
                    return (
                        <PatientItem
                            name={patient.NombrePaciente}
                            email={patient.IDPaciente}
                            key={patient.IDPaciente}
                        />
                    );
                })}
            </div>
            <ModalAddPatient open={isModalAdd} onClose={() => setIsModalAdd(false)}></ModalAddPatient>
        </Card>
    );
};

export default PatientList;
