"use client";

import { auth } from "@/src/firebase";

import SignOut from "./SignOut";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const homePath = "/";
const loginPath = "/login";

const NavbarButtons = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);

            if (user === null) {
                if (pathname !== loginPath) router.push(loginPath);
            } else {
                if (pathname === loginPath) router.push(homePath);
            }
        }, []);

        return () => unsubscribe();
    }, [pathname]);

    if (user === null) return;

    return (
        <>
            <li>
                <SignOut />
            </li>
            <li>
                <Profile email={user.email} />
            </li>
        </>
    );
};

export default NavbarButtons;
