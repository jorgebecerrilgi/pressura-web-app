"use client";

import styles from "./GraphButton.module.css";

const GraphButton = ({ selected, onClick, children }) => {
    return (
        <button className={styles.graphButton} onClick={onClick}>
            {children}
            {selected && <div className={styles.buttonLine}></div>}
        </button>
    );
};

export default GraphButton;
