"use client";

import styles from "./Measurement.module.css";

const Measurement = ({ title, value, units }) => {
    return (
        <div className={styles.measurement}>
            <h4>{title}</h4>
            <span className={styles.value}>{value}</span>
            <span className={styles.units}>{units}</span>
        </div>
    );
};

export default Measurement;
