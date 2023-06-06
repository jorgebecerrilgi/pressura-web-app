"use client";

import Skeleton from "@/components/Skeleton";
import styles from "./PatientProfileCard.module.css";
import Card from "@/components/Card";

const PatientProfileCard = ({ isLoading, name, height, weight, sex, date, email }) => {
    const birthday = date ? date.toDate().toLocaleDateString() : "Sin fecha";
    const currentDateMiliseconds = new Date().getTime();
    const birthdayMiliseconds = date ? date.toDate().getTime() : 0;
    const originYear = new Date(0).getFullYear();
    const age = date ? new Date(currentDateMiliseconds - birthdayMiliseconds).getFullYear() - originYear : "N/A";

    const firstLetter = name ? name.charAt(0).toUpperCase() : ".";
    const iconColorHue = name
        ? name.split("").reduce((prev, letter) => {
              return ((letter.toLowerCase().charCodeAt(0) - 97) * 8 + prev) % 255;
          }, 0)
        : 0;

    return (
        <Card className={styles.patientProfileCard}>
            {isLoading ? (
                <>
                    <Skeleton height={80} width={80} marginBottom={8} />
                    <Skeleton height={32} marginBottom={24} />
                    <Skeleton height={42} marginBottom={8} />
                    <Skeleton height={42} marginBottom={8} />
                    <Skeleton height={42} marginBottom={8} />
                    <Skeleton height={42} marginBottom={8} />
                    <Skeleton height={42} marginBottom={8} />
                    <Skeleton height={42} marginBottom={8} />
                </>
            ) : (
                <>
                    <div className={styles.profileIcon} style={{ backgroundColor: `hsl(${iconColorHue}, 50%, 39%)` }}>
                        <p>{firstLetter}</p>
                    </div>
                    <h3>{name}</h3>
                    <ul>
                        <li className={styles.title}>Edad</li>
                        <li>{age}</li>
                        <li className={styles.title}>Altura</li>
                        <li>{height} cm.</li>
                        <li className={styles.title}>Peso</li>
                        <li>{weight} kg.</li>
                        <li className={styles.title}>Sexo</li>
                        <li>{sex === null ? "N/A" : sex === 0 ? "Femenino" : "Masculino"}</li>
                        <li className={styles.title}>Fecha de Nacimiento</li>
                        <li>{birthday}</li>
                        <li className={styles.title}>Correo Electrónico</li>
                        <li>{email}</li>
                    </ul>
                </>
            )}
        </Card>
    );
};

export default PatientProfileCard;
