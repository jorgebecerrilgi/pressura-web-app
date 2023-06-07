"use client";

import styles from "./InputElement.module.css";

const InputElement = ({ title, value, onChange }) => {
    return (
        <div className={styles.inputElement}>
            <p>{title}</p>
            <input value={value} onChange={onChange} required type="email" autoComplete="off" />
        </div>
    );
};

export default InputElement;
