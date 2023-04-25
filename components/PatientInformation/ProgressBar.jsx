import style from "./ProgressBar.module.css";

const ProgressBar = ({ value }) => {
    const MIN = 0;
    const MAX = 100;
    const percentage = `${Math.min(Math.max(value, MIN), MAX)}%`;

    return (
        <div className={style.progressBar}>
            <span className={style.text}>{percentage}</span>
            <div className={style.progress} style={{ width: percentage }}></div>
        </div>
    );
};

ProgressBar.defaultProps = {
    value: 0,
};

export default ProgressBar;
