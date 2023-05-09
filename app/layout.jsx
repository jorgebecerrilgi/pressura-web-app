import "./globals.css";
import Link from "next/link";
import SignOut from "./SignOut";
import Profile from "./Profile";
import ContextProvider from "./ContextProvider";

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <img src="/pressura-logo-white.png" height="32px"></img>
            </Link>
            <ul>
                <li>
                    <SignOut />
                </li>
                <li>
                    <Profile />
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
                <ContextProvider>
                    <NavBar />
                    {children}
                </ContextProvider>
            </body>
        </html>
    );
}
