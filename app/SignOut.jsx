"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase";
import { useContext, useState } from "react";
import { AppContext } from "./ContextProvider";
import ModalConfirm from "@/components/ModalConfirm";

const SignOut = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { updateData } = useContext(AppContext);
    const onSignOut = async () => {
        try {
            await signOut(auth);
            updateData("account", null);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <button type="button" onClick={() => setIsModalOpen(true)}>
                Cerrar Sesión
            </button>
            {isModalOpen && (
                <ModalConfirm
                    open
                    title="Cerrar sesión"
                    onClose={closeModal}
                    onCancel={closeModal}
                    onAccept={onSignOut}
                >
                    ¿Estás seguro que quieres cerrar sesión?
                </ModalConfirm>
            )}
        </>
    );
};

export default SignOut;
