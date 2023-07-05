"use client";

import { useContext, useState } from "react";
import style from "./page.module.css";
import { auth } from "@/src/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../ContextProvider";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notLong, setNotLong] = useState("");
    const { updateData } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            updateData("account", userCredential.user);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={style.main}>
            <div className={style.imgs}>
                <img src="/pressura-logotitle-white.png" className={style.logo}></img>
            </div>
            <div className={style.subMain}>
                <div className={style.subMainContent}>
                    <div style={{ padding: "10px" }}>
                        <div style={{ paddingTop: "20px" }}>
                            <h1>Registrate</h1>
                        </div>

                        <div className={style.loginLabel1}>Correo Electronico:</div>

                        <div className={style.secondInput}>
                            <input
                                type="email"
                                placeholder="ejemplo@hotmail.com"
                                className="name"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={style.loginLabel}>Contraseña:</div>
                        {notLong && (
                            <p style={{ color: "red" }}> La contraseña debe de contener al menos 11 caracteres</p>
                        )}
                        <div className={style.secondInput}>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="name"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={style.buttonGroup}>
                            <button className={style.loginButton} onClick={handleSubmit}>
                                Registrate
                            </button>

                            {/* <button onClick={ingresarConGoogle} className="login-button-google">
                                Registrate Con Google
                            </button> */}
                        </div>

                        <div className="link" style={{ paddingTop: "20px" }}>
                            <p>
                                Ya tienes cuenta?{" "}
                                <Link href="/login">Ingresa aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
