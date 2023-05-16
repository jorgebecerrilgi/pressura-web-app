"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase";

const SignOut = () => {
    return <button onClick={() => signOut(auth)}>Cerrar Sesión</button>;
};

export default SignOut;
