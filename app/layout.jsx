"use client";

import "./globals.css";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

const NavBar = () => {
    // const [profileOpened, setProfileOpened] = useState(false);
    // const [user, setUser] = useState("");
    // const [doctorData, setDoctorData] = useState({});

    // useEffect(() => {
    //     onAuthStateChanged(auth, (userSession) => {
    //         if (userSession !== null) {
    //             setUser(userSession.email);
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     const getDoctorData = async () => {
    //         const doctorsCollectionRef = collection(db, "Doctor");
    //         const doctorQuery = query(
    //             doctorsCollectionRef,
    //             where("IDDoctor", "==", user)
    //         );
    //         const doctorSnap = await getDocs(doctorQuery);
    //         setDoctorData(doctorSnap.size > 0 ? doctorSnap.docs[0].data() : {});
    //     };
    //     getDoctorData();
    // }, [user]);

    return (
        <nav className="navbar">
            <a href="/" className="navbar-logo">
                <img src="/pressura-logo-white.png" height="32px"></img>
            </a>
            <ul>
                <li>
                    <a 
                        href="#" 
                        // onClick={onClickLogout}
                    >
                        Cerrar Sesión
                    </a>
                    {/* {profileOpened && (
                        <ProfileCard name={doctorData.Nombre} email={user} />
                    )} */}
                </li>
                <li>
                    <a
                        href="#"
                        // onClick={() => setProfileOpened(!profileOpened)}
                    >
                        <img src="/icon-profile.svg" height="32px"></img>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export const metadata = {
    title: "Pressura",
    description: "Aplicación web para monitorear la presión de pacientes.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
