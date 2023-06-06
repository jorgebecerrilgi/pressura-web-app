"use client";

import style from "./PatientInformation.module.css";
import Card from "../Card";
import ProgressBar from "./ProgressBar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/ContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/firebase";
import Link from "next/link";
import Skeleton from "../Skeleton";

const fetchInformation = async (email) => {
    const snap = await getDocs(query(collection(db, "Paciente"), where("IDPaciente", "==", email)));
    return snap.size > 0 ? snap.docs[0].data() : {};
};

const fetchHabits = async (email) => {
    const snap = await getDocs(query(collection(db, "Habitos"), where("IDPaciente", "==", email)));
    return snap.size > 0 ? snap.docs.map((doc) => doc.data()) : [];
};

const PatientInformation = () => {
    const [information, setInformation] = useState({});
    const [habitsData, setHabitsData] = useState({});
    const { selectedPatient, updateData } = useContext(AppContext);

    useEffect(() => {
        setInformation({});
        setHabitsData({});
        if (selectedPatient === null) return;
        const fetchData = async () => {
            // Información del paciente.
            const patientInformation = await fetchInformation(selectedPatient.email);
            setInformation(patientInformation);
            // Habitos.
            const patientHabits = await fetchHabits(selectedPatient.email);
            const habitsAverages = patientHabits.reduce(
                (data, current, index, arr) => {
                    const newData = {
                        medicamentos: data.medicamentos + current.Medicamentos,
                        ejercicio: data.ejercicio + current.Ejercicio,
                        regimenAlimenticio: data.regimenAlimenticio + current.RegimenAlimenticio,
                    };
                    const amountOfHabits = arr.length;
                    if (index === amountOfHabits - 1) {
                        return {
                            medicamentos: newData.medicamentos / amountOfHabits,
                            ejercicio: newData.ejercicio / amountOfHabits,
                            regimenAlimenticio: newData.regimenAlimenticio / amountOfHabits,
                        };
                    } else {
                        return newData;
                    }
                },
                {
                    medicamentos: 0,
                    ejercicio: 0,
                    regimenAlimenticio: 0,
                }
            );
            setHabitsData(habitsAverages);
        };
        fetchData();
    }, [selectedPatient]);

    if (selectedPatient === null) return <div></div>;

    const firstLetter = selectedPatient.name.charAt(0);
    const iconColorHue = selectedPatient.name.split("").reduce((prev, letter) => {
        return ((letter.toLowerCase().charCodeAt(0) - 97) * 8 + prev) % 255;
    }, 0);

    const birthday = information?.FechaNacimiento?.toDate();
    const age = Math.floor((new Date() - birthday) / (1000 * 60 * 60 * 24 * 365.25));

    return (
        <Card className={style.patientInformation}>
            <div>
                <div
                    className={style.profileIcon}
                    style={{
                        backgroundColor: `hsl(${iconColorHue}, 50%, 39%)`,
                    }}
                >
                    <p>{firstLetter}</p>
                </div>
                <h3>{selectedPatient.name}</h3>
                <ul className={style.dataLabels}>
                    <li>
                        {Object.keys(information).length > 0 ? (
                            <>
                                <span className={style.title}>Edad</span>
                                <br />
                                {age}
                            </>
                        ) : (
                            <Skeleton height={42} />
                        )}
                    </li>
                    <li>
                        {Object.keys(information).length > 0 ? (
                            <>
                                <span className={style.title}>Peso</span>
                                <br />
                                {information?.Peso} kg.
                            </>
                        ) : (
                            <Skeleton height={42} />
                        )}
                    </li>
                    <li>
                        {Object.keys(information).length > 0 ? (
                            <>
                                <span className={style.title}>Altura</span>
                                <br />
                                {information?.Altura} m.
                            </>
                        ) : (
                            <Skeleton height={42} />
                        )}
                    </li>
                    <li>
                        {Object.keys(information).length > 0 ? (
                            <>
                                <span className={style.title}>Sexo</span>
                                <br />
                                {information?.Sexo === 1 ? "Hombre" : "Mujer"}
                            </>
                        ) : (
                            <Skeleton height={42} />
                        )}
                    </li>
                    <li>
                        {Object.keys(information).length > 0 ? (
                            <>
                                <span className={style.title}>Fecha de Nacimiento</span>
                                <br />
                                {birthday?.toLocaleDateString()}
                            </>
                        ) : (
                            <Skeleton height={42} />
                        )}
                    </li>
                    <li>
                        {Object.keys(information).length > 0 ? (
                            <>
                                <span className={style.title}>Correo Electrónico</span>
                                <br />
                                {information?.IDPaciente}
                            </>
                        ) : (
                            <Skeleton height={42} />
                        )}
                    </li>
                </ul>
                <ul className={style.dataHabits}>
                    <li>
                        {Object.keys(habitsData).length > 0 ? (
                            <>
                                <span className={style.title}>Medicamento</span>
                                <ProgressBar value={habitsData.medicamentos} iconSrc="/icon_medicine.png" iconAlt="" />
                            </>
                        ) : (
                            <Skeleton width="60%" height={48} marginBottom={12} />
                        )}
                    </li>
                    <li>
                        {Object.keys(habitsData).length > 0 ? (
                            <>
                                <span className={style.title}>Ejercicio</span>
                                <ProgressBar value={habitsData.ejercicio} iconSrc="/icon_exercise.png" iconAlt="" />
                            </>
                        ) : (
                            <Skeleton width="60%" height={48} marginBottom={12} />
                        )}
                    </li>
                    <li>
                        {Object.keys(habitsData).length > 0 ? (
                            <>
                                <span className={style.title}>Alimentación</span>
                                <ProgressBar
                                    value={habitsData.regimenAlimenticio}
                                    iconSrc="/icon_food.png"
                                    iconAlt=""
                                />
                            </>
                        ) : (
                            <Skeleton width="60%" height={48} marginBottom={12} />
                        )}
                    </li>
                </ul>
            </div>
            <Link href="/patient?id=1" className={style.button}>
                Ver más
            </Link>
        </Card>
    );
};

export default PatientInformation;
