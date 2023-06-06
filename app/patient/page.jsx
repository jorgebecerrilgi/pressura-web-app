"use client";

import styles from "./page.module.css";
import PatientCard from "./PatientCard";
import PatientProfileCard from "./PatientProfileCard";

const Patient = () => {
    return (
        <main className={styles.content}>
            <PatientCard />
            <PatientProfileCard
                name={"name"}
                age={"age"}
                sex={"sex"}
                height={"height"}
                weight={"weight"}
                date={"date"}
                email={"email"}
            />
        </main>
    );
};

export default Patient;
