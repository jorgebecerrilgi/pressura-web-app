"use client";

import { useState, createContext } from "react";

export const AppContext = createContext({});

const DEFAULT_DATA = {
    account: null,
    selectedUser: null,
};

const ContextProvider = ({ children }) => {
    const [data, setData] = useState(DEFAULT_DATA);

    const updateData = (name, value) => {
        if (!Object.keys(data).some((key) => key === name)) return;
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    return (
        <AppContext.Provider value={{ ...data, updateData: updateData }}>
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
