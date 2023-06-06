"use client";

import styles from "./PatientProfileCard.module.css";
import Card from "@/components/Card";

const PatientProfileCard = ({ name, age, height, weight, sex, date, email }) => {
    return (
        <Card className={styles.patientProfileCard}>
            {/* <img src={profile} width="60%" /> */}
            <h3>{name}</h3>
            <ul>
                <li className={styles.title}>Edad</li>
                <li>{age}</li>
                <li className={styles.title}>Altura</li>
                <li>{height}</li>
                <li className={styles.title}>Peso</li>
                <li>{weight}</li>
                <li className={styles.title}>Sexo</li>
                <li>{sex}</li>
                <li className={styles.title}>Fecha de Nacimiento</li>
                <li>{date}</li>
                <li className={styles.title}>Correo Electrónico</li>
                <li>{email}</li>
            </ul>
        </Card>
    );
};

export default PatientProfileCard;
