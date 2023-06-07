"use client";

import { useState } from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({ email }) => {
    const [isOpen, setIsOpen] = useState(false);

    const firstLetter = email.charAt(0).toUpperCase();
    const iconColorHue = email.split("").reduce((prev, letter) => {
        return ((letter.toLowerCase().charCodeAt(0) - 97) * 8 + prev) % 255;
    }, 0);

    return (
        <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen && <ProfileCard email={email} iconHue={iconColorHue} iconLetter={firstLetter} />}
            <div
                className={`navbarUserIcon`}
                style={{
                    color: `hsl(${iconColorHue}, 50%, 39%)`,
                }}
            >
                <p>{firstLetter}</p>
            </div>
        </button>
    );
};

export default Profile;
