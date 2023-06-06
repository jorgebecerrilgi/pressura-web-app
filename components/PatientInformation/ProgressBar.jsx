"use client";

import style from "./ProgressBar.module.css";

const MIN = 0;
const MAX = 100;

const ProgressBar = ({ value = 0, iconSrc, iconAlt }) => {
    const percentage = `${Math.min(Math.max(value, MIN), MAX)}%`;

    return (
        <div className={style.progressBar}>
            {iconSrc !== null && <img src={iconSrc} alt={iconAlt} className={style.barIcon} />}
            <div
                className={style.progress}
                style={{ width: percentage, backgroundColor: `hsl(${value}, 50%, 39%)` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
