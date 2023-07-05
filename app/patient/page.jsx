"use client";

import styles from "./page.module.css";
import PatientCard from "./PatientCard";
import PatientProfileCard from "./PatientProfileCard";
import { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/firebase";
import { useSearchParams } from "next/navigation";
import { AppContext } from "../ContextProvider";

const fetchInformation = async (docID) => {
    if (docID == null) {
        throw Error("El identificador de documento no fue pasado correctamente, y parece ser nulo.");
    }
    const patientDoc = doc(db, "Paciente", docID);
    const snap = await getDoc(patientDoc);
    if (snap.exists()) {
        return snap.data();
    } else {
        throw Error(`No se encontró el documento del paciente con id: ${docID}`);
    }
};

const Patient = () => {
    const [information, setInformation] = useState(null);
    const { updateData } = useContext(AppContext);
    const params = useSearchParams();
    const docID = params.get("id");

    useEffect(() => {
        updateData("selectedPatient", null);
        const fetchData = async () => {
            try {
                const patientInformation = await fetchInformation(docID);
                setInformation(patientInformation);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <main className={styles.content}>
            <PatientCard email={information?.CorreoElectronico} />
            <PatientProfileCard
                isLoading={information === null}
                name={information?.Nombre}
                sex={information?.Sexo}
                height={information?.Altura}
                weight={information?.Peso}
                date={information?.FechaNacimiento}
                email={information?.CorreoElectronico}
            />
        </main>
    );
};

export default Patient;
