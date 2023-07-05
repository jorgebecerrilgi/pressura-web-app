"use client";

import { useEffect, useState } from "react";
import FloatingGraph from "./FloatingGraph";
import Measurement from "./Measurement";
import styles from "./PatientCard.module.css";
import Card from "@/components/Card";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/src/firebase";

const DaysInType = {
    week: 7,
    month: 30,
    trimester: 90,
};

const calculateAverage = (arr) => Number((arr.reduce((acc, val) => acc + val, 0) / arr.length).toFixed(0));

const calculateDesviacion = (arr) => {
    const avg = calculateAverage(arr);
    const desviacionesSquared = arr.map((val) => Math.pow(val - avg, 2));
    const sumSquares = desviacionesSquared.reduce((acc, val) => acc + val, 0);
    const varianza = sumSquares / arr.length;
    return Number(Math.sqrt(varianza).toFixed(0));
};

const isSameDate = (date1, date2) => {
    const y1 = date1.getFullYear();
    const m1 = date1.getMonth();
    const d1 = date1.getDate();
    const y2 = date2.getFullYear();
    const m2 = date2.getMonth();
    const d2 = date2.getDate();
    return y1 === y2 && m1 === m2 && d1 === d2;
};

const fetchPressures = async (patientID, type) => {
    const limitAmount = DaysInType[type];
    if (limitAmount == null) {
        throw new Error(`Invalid type argument: ${type}`);
    }
    const dateBeforeRange = new Date();
    dateBeforeRange.setDate(dateBeforeRange.getDate() - limitAmount);
    const col = collection(db, "Presion");
    const q = query(col, where("IDPaciente", "==", patientID), where("Fecha", ">", dateBeforeRange));
    const snap = await getDocs(q);
    return snap.empty ? [] : snap.docs.map((doc) => doc.data());
};

const fetchHabits = async (patientID, type) => {
    const limitAmount = DaysInType[type];
    if (limitAmount == null) {
        throw new Error(`Invalid type argument: ${type}`);
    }
    const dateBeforeRange = new Date();
    dateBeforeRange.setDate(dateBeforeRange.getDate() - limitAmount);
    const col = collection(db, "Habitos");
    const q = query(col, where("IDPaciente", "==", patientID), where("Fecha", ">", dateBeforeRange));
    const snap = await getDocs(q);
    return snap.empty ? [] : snap.docs.map((doc) => doc.data());
};

const PatientCard = ({ email }) => {
    const [pressures, setPressures] = useState(null);
    const [habits, setHabits] = useState(null);
    const [limitType, setLimitType] = useState("week");

    useEffect(() => {
        if (email == null) return;
        const fetchData = async () => {
            try {
                const patientPressures = await fetchPressures(email, limitType);
                setPressures(patientPressures);
                console.log("pressures", patientPressures);
            } catch (err) {
                console.error(err);
            }
            try {
                const patientHabits = await fetchHabits(email, limitType);
                setHabits(patientHabits);
                console.log(patientHabits);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [email, limitType]);

    const superiorArr = pressures
        ? pressures.map((p) => p.MedidaSuperior).filter((val) => typeof val === "number" && !Number.isNaN(val))
        : null;
    const inferiorArr = pressures
        ? pressures.map((p) => p.MedidaInferior).filter((val) => typeof val === "number" && !Number.isNaN(val))
        : null;
    const data = Array.from(Array(DaysInType[limitType])).map((v, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const measure = {
            Sistolica: [],
            Diastolica: [],
            Fecha: date,
            Medicamento: null,
            RegimenAlimenticio: null,
            Ejercicio: null,
        };
        if (pressures != null && pressures.length > 0) {
            // Finds pressure from that same date.
            const pressure = pressures.find((p) => p?.Fecha && isSameDate(p.Fecha.toDate(), date));
            if (pressure) {
                const superiores = [pressure?.MedidaSuperior1, pressure?.MedidaSuperior2, pressure?.MedidaSuperior3];
                const inferiores = [pressure?.MedidaInferior1, pressure?.MedidaInferior2, pressure?.MedidaInferior3];
                measure.Sistolica = superiores.filter((sup) => typeof sup === "number");
                measure.Diastolica = inferiores.filter((inf) => typeof inf === "number");
            }
        }
        if (habits != null && habits.length > 0) {
            const habit = habits.find((h) => h?.Fecha && isSameDate(h.Fecha.toDate(), date));
            if (habit) {
                measure.Medicamento = habit?.Medicamentos;
                measure.RegimenAlimenticio = habit?.RegimenAlimenticio;
                measure.Ejercicio = habit?.Ejercicio;
            }
        }
        return measure;
    });
    console.log("data", data);
    return (
        <Card className={styles.patientCard}>
            <h2>Sistólica</h2>
            <div className={styles.measurements}>
                <Measurement
                    title="Media"
                    value={superiorArr && superiorArr.length > 0 ? calculateAverage(superiorArr) : "N/A"}
                    units="mm/Hg"
                />
                <Measurement
                    title="Desviación Estándar"
                    value={superiorArr && superiorArr.length > 0 ? calculateDesviacion(superiorArr) : "N/A"}
                    units="mm/Hg"
                />
            </div>
            <h2>Diastólica</h2>
            <div className={styles.measurements}>
                <Measurement
                    title="Media"
                    value={inferiorArr && inferiorArr.length > 0 ? calculateAverage(inferiorArr) : "N/A"}
                    units="mm/Hg"
                />
                <Measurement
                    title="Desviación Estándar"
                    value={inferiorArr && inferiorArr.length > 0 ? calculateDesviacion(inferiorArr) : "N/A"}
                    units="mm/Hg"
                />
            </div>
            <h2>Mediciones</h2>
            <FloatingGraph onChange={setLimitType} measurements={data} />
        </Card>
    );
};

export default PatientCard;
