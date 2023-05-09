"use client";

import style from "./PatientList.module.css";
import Card from "../Card";
import PatientItem from "./PatientItem";
import SearchBar from "./SearchBar";
import { useState } from "react";

const PLACEHOLDER_USERS = [
    { name: "Ana Almendarez", id: "ana@mail.com" },
    { name: "Bianca Blaz", id: "bianca@mail.com" },
    { name: "Carlos", id: "carlos@mail.com" },
    { name: "Diana Dominguez", id: "diana@mail.com" },
    { name: "Esteban Elver", id: "esteban@mail.com" },
    { name: "Felipe Franco", id: "felipe@mail.com" },
    { name: "Gerardo Gonzalez", id: "gerarado@mail.com" },
];

const PatientList = ({}) => {
    const [users, setUsers] = useState(PLACEHOLDER_USERS);
    const [search, setSearch] = useState("");

    return (
        <Card className={style.patientList}>
            <SearchBar
                onClickSearch={setSearch}
                // onClickAdd={onClickAdd}
            />
            <div className={style.items}>
                {users
                    .filter((user) => {
                        return user.name.toLowerCase().includes(search);
                    })
                    .map((user) => {
                        return (
                            <PatientItem
                                name={user.name}
                                email={user.id}
                                key={user.id}
                            />
                        );
                    })}
            </div>
        </Card>
    );
};

export default PatientList;
