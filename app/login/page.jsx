"use client";

import { useState } from "react";
import style from "./page.module.css";
import { auth } from "@/src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Logging in...");
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("Success!");
        } catch (err) {
            console.log("Fail...");
            console.error(err);
        }
    };

    return (
        <div className={style.main}>
            <div className={style.imgs}>
                <img
                    src="/pressura-logotitle-white.png"
                    className={style.logo}
                ></img>
            </div>

            <div className={style.subMain}>
                <div
                    className={style.subMainContent}
                    style={{ padding: "10px" }}
                >
                    <div>
                        <div style={{ paddingTop: "20px" }}>
                            <h1>Inicia Sesion</h1>
                        </div>

                        <div className={style.loginLabel1}>
                            Correo Electronico:
                        </div>

                        <div className={style.secondInput}>
                            <input
                                type="email"
                                placeholder="ejemplo@hotmail.com"
                                className={style.name}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={style.loginLabel}>Contraseña:</div>
                        <div className={style.secondInput}>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className={style.name}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={style.buttonGroup}>
                            <button
                                className={style.loginButton}
                                onClick={handleSubmit}
                            >
                                Ingresar
                            </button>
                            {/* <button className={style.login-button-google">Login con google</button> */}
                            <button
                                // onClick={logout}
                                className={style.loginButtonGoogle}
                            >
                                Ingresa con Google
                            </button>
                        </div>

                        <div
                            className={style.link}
                            style={{ paddingTop: "20px" }}
                        >
                            <p>
                                No tienes cuenta?{" "}
                                <a
                                    href=""
                                    // onClick={goToSignIn}
                                >
                                    Crea una aqui
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
