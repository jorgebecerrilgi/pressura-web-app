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
    const { account } = useContext(AppContext);

    useEffect(() => {
        if (account === null) return;
        const fetchData = async () => {
            const patientsArr = await fetchPatients(account.email, search);
            setPatients(patientsArr);
        };
        fetchData();
    }, [account, search]);

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
            {/* <ModalConfirm open title="Cerrar Sesión">
                ¿Seguro que quieres cerrar sesión?
            </ModalConfirm> */}
            <ModalAddPatient open={isModalAdd} onClose={() => setIsModalAdd(false)}></ModalAddPatient>
        </Card>
    );
};

export default PatientList;
