"use client";

import { auth } from "@/src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext, useEffect } from "react";

export const AppContext = createContext({});

const DEFAULT_DATA = {
    account: null,
    selectedPatient: null,
};

const ContextProvider = ({ children }) => {
    const [data, setData] = useState(DEFAULT_DATA);

    const updateData = (name, value) => {
        if (!Object.keys(data).some((key) => key === name)) return;
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user === null) return;
            updateData("account", user);
        });
    }, []);

    useEffect(() => console.log(data), [data]);

    return <AppContext.Provider value={{ ...data, updateData: updateData }}>{children}</AppContext.Provider>;
};

export default ContextProvider;
