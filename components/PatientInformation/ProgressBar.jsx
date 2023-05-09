"use client"

import style from "./ProgressBar.module.css";

const MIN = 0;
const MAX = 100;

const ProgressBar = ({ value = 0 }) => {
    const percentage = `${Math.min(Math.max(value, MIN), MAX)}%`;

    return (
        <div className={style.progressBar}>
            <span className={style.text}>{percentage}</span>
            <div className={style.progress} style={{ width: percentage }}></div>
        </div>
    );
};

export default ProgressBar;
