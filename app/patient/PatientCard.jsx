"use client";

import styles from "./PatientCard.module.css";
import Card from "@/components/Card";

const PatientCard = () => {
    return (
        <Card className={styles.patientCard}>
            <h2>Sistólica</h2>
            {/* <div className="measurements">
                <Measurement title="Media" value="130" units="mm/Hg" />
                <Measurement title="Desviación Media" value="123" units="mm/Hg" />
            </div> */}
            <h2>Diastólica</h2>
            {/* <div className="measurements">
                <Measurement title="Media" value="105" units="mm/Hg" />
                <Measurement title="Desviación Media" value="100" units="mm/Hg" />
            </div> */}
            <h2>Mediciones</h2>
            {/* <FloatingGraph /> */}
        </Card>
    );
};

export default PatientCard;
