"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase";
import { useContext } from "react";
import { AppContext } from "./ContextProvider";

const SignOut = () => {
    const { updateData } = useContext(AppContext);
    const onSignOut = async () => {
        try {
            await signOut(auth);
            updateData("account", null);
        } catch (e) {
            console.error(e);
        }
    };

    return <button onClick={() => onSignOut()}>Cerrar Sesión</button>;
};

export default SignOut;
