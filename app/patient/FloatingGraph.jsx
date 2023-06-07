"use client";

import styles from "./FloatingGraph.module.css";
import { useEffect, useRef, useState } from "react";
import GraphButton from "./GraphButton";
import FloatingBar from "./FloatingBar";

function generateMeasurements(dateIndex) {
    const diastolicaArray = Array.from(Array(3))
        .map(() => Math.floor(Math.random() * 30) + 110)
        // .filter(() => Math.floor(Math.random() * 2));
        .filter(() => Math.floor(Math.random() * 10) > 1);
    return {
        UIDPaciente: "a0",
        Fecha: new Date(Date.now() - 86400000 * dateIndex),
        Diastolica: diastolicaArray,
        Sistolica: diastolicaArray.map((val) => val - 30 - Math.floor(Math.random() * 20)),
        Medicamento: Math.floor(Math.random() * 80) + 20,
        RegimenAlimenticio: Math.floor(Math.random() * 80) + 20,
        Ejercicio: Math.floor(Math.random() * 80) + 20,
    };
}

const calculateAbsolutePositions = (graphAreaElement, left, top) => {
    if (graphAreaElement == null || left == null) {
        return {
            left: 0,
            top: 0,
        };
    }
    const rect = graphAreaElement.getBoundingClientRect();
    const localLeft = left - rect.left;
    const localTop = top - rect.top;
    const absLeft = (localLeft * 100) / rect.width;
    const absTop = (localTop * 100) / rect.height;
    return {
        left: `${absLeft}%`,
        top: `${absTop}%`,
    };
};

const FloatingGraph = () => {
    const [measurements, setMeasurements] = useState([]);
    const [cardPosition, setCardPosition] = useState({
        left: null,
        top: null,
    });
    const [insideCircle, setInsideCircle] = useState(false);
    const [insideCard, setInsideCard] = useState(false);
    const [selectedButton, setSelectedButton] = useState(0);
    const amountOfDays = selectedButton === 0 ? 7 : selectedButton === 1 ? 30 : 90;
    const graphAreaRef = useRef(null);

    useEffect(() => {
        console.log(`inCard: ${insideCard} /// inCircle: ${insideCircle}`);
        if (!insideCard && !insideCircle) {
            setCardPosition({ left: null, top: null });
        }
    }, [insideCard, insideCircle]);

    const handleMouseMove = (e, diastolica, sistolica) => {
        console.log(e.clientX);
        setCardPosition({
            left: e.clientX,
            top: e.clientY,
            diastolica: diastolica,
            sistolica: sistolica,
        });
        setInsideCircle(true);
    };
    const handleMouseLeave = (e) => setInsideCircle(false);
    const cardHandleMouseEnter = (e) => setInsideCard(true);
    const cardHandleMouseLeave = (e) => setInsideCard(false);

    const max = measurements.reduce((current, measure) => {
        if (measure.Sistolica.length === 0) return current;
        return Math.max(current, Math.max.apply(null, measure.Diastolica));
    }, 0);
    const min = measurements.reduce((current, measure) => {
        if (measure.Sistolica.length === 0) return current;
        return Math.min(current, Math.min.apply(null, measure.Sistolica));
    }, 999);

    const topValue = max > 180 ? 220 : 180;
    const bottomValue = 50;

    const topBand = ((130 - bottomValue) * 100) / (topValue - bottomValue);
    const bottomBand = ((80 - bottomValue) * 100) / (topValue - bottomValue);

    const SKIPS = (topValue - bottomValue) / 13;

    useEffect(() => {
        setMeasurements(Array.from(Array(amountOfDays)).map((v, i) => generateMeasurements(i)));
    }, [selectedButton]);

    return (
        <div className={styles.floatingGraph}>
            <div className={styles.buttons}>
                <GraphButton selected={selectedButton === 0} onClick={(e) => setSelectedButton(0)}>
                    Semana
                </GraphButton>
                <GraphButton selected={selectedButton === 1} onClick={(e) => setSelectedButton(1)}>
                    Mes
                </GraphButton>
                <GraphButton selected={selectedButton === 2} onClick={(e) => setSelectedButton(2)}>
                    Trimestre
                </GraphButton>
            </div>
            <div className={styles.top}>
                <div className={styles.yAxis}>
                    {Array.from(Array(14)).map((v, i) => (
                        <span key={i * SKIPS}>{(topValue - i * SKIPS).toFixed(0)}</span>
                    ))}
                </div>
                <div ref={graphAreaRef} className={styles.graphArea}>
                    <div
                        className={styles.band}
                        style={{
                            inset: `${100 - topBand}% 0 ${bottomBand}% 0`,
                        }}
                    ></div>
                    {measurements.map((measurement, i) => (
                        <FloatingBar
                            key={measurement.Fecha.toJSON()}
                            diastolica={measurement.Diastolica}
                            sistolica={measurement.Sistolica}
                            topValue={topValue}
                            bottomValue={bottomValue}
                            handleMouseMove={handleMouseMove}
                            handleMouseLeave={handleMouseLeave}
                            smallCircle={selectedButton === 2}
                            midCircle={selectedButton === 1}
                            style={{
                                left: `${100 - (100 / measurements.length) * (i + 1)}%`,
                                width: `${100 / measurements.length - 1}%`,
                            }}
                        />
                    ))}
                    {cardPosition.left !== null && (
                        <div
                            className={styles.measurementCard}
                            style={{
                                ...calculateAbsolutePositions(
                                    graphAreaRef.current,
                                    cardPosition.left,
                                    cardPosition.top
                                ),
                            }}
                            onMouseEnter={cardHandleMouseEnter}
                            onMouseLeave={cardHandleMouseLeave}
                        >
                            <p className={styles.title}>Sistolica</p>
                            {cardPosition.diastolica
                                .toSorted((a, b) => b - a)
                                .map((v) => (
                                    <p key={v}>{v.toFixed(2)} mm/Hg</p>
                                ))}
                            <p className={styles.title}>Diastolica</p>
                            {cardPosition.sistolica
                                .toSorted((a, b) => b - a)
                                .map((v) => (
                                    <p key={v}>{v.toFixed(2)} mm/Hg</p>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.bottom}>
                {Array.from(Array(amountOfDays)).map((v, i) => (
                    <span
                        className={styles.date}
                        key={i}
                        style={{
                            fontSize: selectedButton === 0 ? "1rem" : selectedButton === 1 ? "0.8rem" : "0.5rem",
                            width: selectedButton === 0 ? null : "0rem",
                        }}
                    >
                        {new Date(Date.now() - 86400000 * i).toLocaleDateString("es-MX", {
                            day: "numeric",
                            month: "short",
                        })}
                    </span>
                ))}
            </div>
            <div className={styles.habits}>
                <div className={styles.types}>
                    <img className={styles.icon} src={"/icon-medicine.svg"}></img>
                    <img className={styles.icon} src={"/icon-diet.svg"}></img>
                    <img className={styles.icon} src={"/icon-exercise.svg"}></img>
                </div>
                <div className={styles.dataArea}>
                    <div className={styles.row}>
                        {measurements.map((v, i) => (
                            <div
                                className={styles.dayData}
                                style={{
                                    backgroundColor: `hsl(${1.2 * v.Medicamento}, 100%, 25%)`,
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        {measurements.map((v, i) => (
                            <div
                                className={styles.dayData}
                                style={{
                                    backgroundColor: `hsl(${1.2 * v.RegimenAlimenticio}, 100%, 25%)`,
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        {measurements.map((v, i) => (
                            <div
                                className={styles.dayData}
                                style={{
                                    backgroundColor: `hsl(${1.2 * v.Ejercicio}, 100%, 25%)`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingGraph;
