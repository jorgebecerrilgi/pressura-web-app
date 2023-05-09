"use client";

import style from "./PatientItem.module.css";
import { useContext } from "react";
import { AppContext } from "@/app/ContextProvider";

const PatientItem = ({ name, email }) => {
    const { selectedUser, updateData } = useContext(AppContext);

    const userData = {
        name: name,
        email: email,
        age: 20,
    };

    const selected = selectedUser?.email === email;
    const toggleSelected = () => {
        updateData("selectedUser", selected ? null : userData);
    };

    const firstLetter = name.charAt(0);
    const iconColorHue = name.split("").reduce((prev, letter) => {
        return ((letter.toLowerCase().charCodeAt(0) - 97) * 8 + prev) % 255;
    }, 0);

    return (
        <div className={style.patientItem} onClick={toggleSelected}>
            <div className={selected ? style.selected : style.unselected}></div>
            <div className={style.info}>
                <div
                    className={style.userIcon}
                    style={{
                        backgroundColor: `hsl(${iconColorHue}, 50%, 39%)`,
                    }}
                >
                    <p>{firstLetter}</p>
                </div>
                <span>
                    {name}
                    <br />
                    <span className={style.subtext}>{email}</span>
                </span>
            </div>
        </div>
    );
};

export default PatientItem;
