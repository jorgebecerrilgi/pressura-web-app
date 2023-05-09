"use client";

import style from "./PatientInformation.module.css";
import Card from "../Card";
import ProgressBar from "./ProgressBar";
import { useContext } from "react";
import { AppContext } from "@/app/ContextProvider";

const PatientInformation = () => {
    const { selectedUser, updateData } = useContext(AppContext);
    if (selectedUser === null) return <div></div>;

    const firstLetter = selectedUser.name.charAt(0);
    const iconColorHue = selectedUser.name.split("").reduce((prev, letter) => {
        return ((letter.toLowerCase().charCodeAt(0) - 97) * 8 + prev) % 255;
    }, 0);

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
                <h3>{selectedUser.name}</h3>
                <ul className={style.dataLabels}>
                    <li>
                        <span className={style.title}>Edad</span>
                        <br />
                        {selectedUser.age}
                    </li>
                    <li>
                        <span className={style.title}>Peso</span>
                        <br />
                        {selectedUser.weight} kg.
                    </li>
                    <li>
                        <span className={style.title}>Altura</span>
                        <br />
                        {selectedUser.height} m.
                    </li>
                    <li>
                        <span className={style.title}>Sexo</span>
                        <br />
                        {selectedUser.sex}
                    </li>
                    <li>
                        <span className={style.title}>Fecha de Nacimiento</span>
                        <br />
                        {selectedUser.dateString}
                    </li>
                    <li>
                        <span className={style.title}>Correo Electrónico</span>
                        <br />
                        {selectedUser.email}
                    </li>
                </ul>
                <ul className={style.dataHabits}>
                    <li>
                        <span className={style.title}>Medicamento</span>
                        <ProgressBar value={selectedUser.lastMedicine} />
                    </li>
                    <li>
                        <span className={style.title}>Ejercicio</span>
                        <ProgressBar value={selectedUser.lastExercise} />
                    </li>
                    <li>
                        <span className={style.title}>Alimentación</span>
                        <ProgressBar value={selectedUser.lastFood} />
                    </li>
                </ul>
            </div>
            <a href="#">
                <p className={style.button}>Ver más</p>
            </a>
        </Card>
    );
};

export default PatientInformation;
