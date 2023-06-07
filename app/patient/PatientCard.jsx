"use client";

import FloatingGraph from "./FloatingGraph";
import Measurement from "./Measurement";
import styles from "./PatientCard.module.css";
import Card from "@/components/Card";

const PatientCard = () => {
    return (
        <Card className={styles.patientCard}>
            <h2>Sistólica</h2>
            <div className={styles.measurements}>
                <Measurement title="Media" value="130" units="mm/Hg" />
                <Measurement title="Desviación Estándar" value="123" units="mm/Hg" />
            </div>
            <h2>Diastólica</h2>
            <div className={styles.measurements}>
                <Measurement title="Media" value="105" units="mm/Hg" />
                <Measurement title="Desviación Estándar" value="100" units="mm/Hg" />
            </div>
            <h2>Mediciones</h2>
            <FloatingGraph />
        </Card>
    );
};

export default PatientCard;
