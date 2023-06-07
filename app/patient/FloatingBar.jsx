"use client";

import styles from "./FloatingBar.module.css";

const FloatingBar = ({
    diastolica,
    sistolica,
    topValue,
    bottomValue,
    handleMouseMove,
    handleMouseLeave,
    smallCircle,
    midCircle,
    style,
}) => {
    // Return empty floating bar if there are no measurement values.
    if (diastolica == null || diastolica.length === 0) return <div className="floating-bar"></div>;

    const circleStyle = smallCircle
        ? {
              width: "1vw",
              height: "1vw",
              minWidth: "1vw",
              minHeight: "1vw",
              fontSize: "0.6rem",
          }
        : midCircle
        ? {
              width: "1.5vw",
              height: "1.5vw",
              minWidth: "1.5vw",
              minHeight: "1.5vw",
          }
        : {};

    // Average of Distolica and Sistolica
    const topAverage = diastolica.reduce((current, val) => current + val, 0) / diastolica.length;
    const bottomAverage = sistolica.reduce((current, val) => current + val, 0) / sistolica.length;
    // Percentage abs for averages
    const topPercentage = ((topAverage - bottomValue) * 100) / (topValue - bottomValue);
    const bottomPercentage = ((bottomAverage - bottomValue) * 100) / (topValue - bottomValue);

    // Maximum and minimum values
    const max = Math.max.apply(null, diastolica);
    const min = Math.min.apply(null, sistolica);
    // Percentage abs for max and min
    const maxPercentage = ((max - bottomValue) * 100) / (topValue - bottomValue);
    const minPercentage = ((min - bottomValue) * 100) / (topValue - bottomValue);

    // Sistolica (Arriba / Up)
    const sistolicaMax = Math.max.apply(null, diastolica);
    const sistolicaAverage = diastolica.reduce((current, val) => current + val, 0) / diastolica.length;
    const sistolicaMin = Math.min.apply(null, diastolica);

    const sistolicaMaxPercentage = ((sistolicaMax - bottomValue) * 100) / (topValue - bottomValue);
    const sistolicaAvgPercentage = ((sistolicaAverage - bottomValue) * 100) / (topValue - bottomValue);
    const sistolicaMinPercentage = ((sistolicaMin - bottomValue) * 100) / (topValue - bottomValue);

    // Diastolica (Abajo / Bottom)
    const diastolicaMax = Math.max.apply(null, sistolica);
    const diastolicaAverage = sistolica.reduce((current, val) => current + val, 0) / sistolica.length;
    const diastolicaMin = Math.min.apply(null, sistolica);

    const diastolicaMaxPercentage = ((diastolicaMax - bottomValue) * 100) / (topValue - bottomValue);
    const diastolicaAvgPercentage = ((diastolicaAverage - bottomValue) * 100) / (topValue - bottomValue);
    const diastolicaMinPercentage = ((diastolicaMin - bottomValue) * 100) / (topValue - bottomValue);

    const maxOverflow = Math.max(topAverage - 130, 0);
    const minOverflow = Math.max(80 - bottomAverage, 0);
    const overflow = (maxOverflow + minOverflow) * 2;

    return (
        <>
            <div
                className={`${styles.topLine} ${styles.top}`}
                style={{
                    bottom: `${sistolicaMaxPercentage}%`,
                    width: `calc(${style.width} / 4)`,
                    left: `calc(${style.left} + ${style.width} / 2.7)`,
                }}
            ></div>
            <div
                className={`${styles.midLine} ${styles.top}`}
                style={{
                    bottom: `${sistolicaAvgPercentage}%`,
                    width: `calc(${style.width} / 2)`,
                    left: `calc(${style.left} + ${style.width} / 4)`,
                }}
            ></div>
            <div
                className={`${styles.bottomLine} ${styles.top}`}
                style={{
                    bottom: `${sistolicaMinPercentage}%`,
                    width: `calc(${style.width} / 4)`,
                    left: `calc(${style.left} + ${style.width} / 2.7)`,
                }}
            ></div>
            <div
                className={`${styles.verticalLine} ${styles.top}`}
                style={{
                    bottom: `${sistolicaMinPercentage}%`,
                    top: `${100 - sistolicaMaxPercentage}%`,
                    left: `calc(${style.left} + ${style.width} / 2)`,
                }}
            ></div>
            <div
                className={`${styles.topLine} ${styles.bottom}`}
                style={{
                    bottom: `${diastolicaMaxPercentage}%`,
                    width: `calc(${style.width} / 4)`,
                    left: `calc(${style.left} + ${style.width} / 2.7)`,
                }}
            ></div>
            <div
                className={`${styles.midLine} ${styles.bottom}`}
                style={{
                    bottom: `${diastolicaAvgPercentage}%`,
                    width: `calc(${style.width} / 2)`,
                    left: `calc(${style.left} + ${style.width} / 4)`,
                }}
            ></div>
            <div
                className={`${styles.bottomLine} ${styles.bottom}`}
                style={{
                    bottom: `${diastolicaMinPercentage}%`,
                    width: `calc(${style.width} / 4)`,
                    left: `calc(${style.left} + ${style.width} / 2.7)`,
                }}
            ></div>
            <div
                className={`${styles.verticalLine} ${styles.bottom}`}
                style={{
                    bottom: `${diastolicaMinPercentage}%`,
                    top: `${100 - diastolicaMaxPercentage}%`,
                    left: `calc(${style.left} + ${style.width} / 2)`,
                }}
            ></div>
            <div
                className={styles.floatingCircle}
                style={{
                    bottom: `${sistolicaMaxPercentage}%`,
                    left: `calc(${{ ...style, ...circleStyle }.left} + ${
                        { ...style, ...circleStyle }.width
                    } / 1.25 - 1.25vw)`,
                    ...circleStyle,
                }}
                onMouseMove={(e) => handleMouseMove(e, diastolica, sistolica)}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                {diastolica.length}
            </div>
        </>
    );
};

export default FloatingBar;
