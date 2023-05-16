"use static";

import Card from "@/components/Card";

const ProfileCard = ({ email, iconHue, iconLetter }) => {
    return (
        <Card className="profile-card">
            <div
                className="profileCardUserIcon"
                style={{
                    backgroundColor: `hsl(${iconHue}, 50%, 39%)`,
                }}
            >
                <p>{iconLetter}</p>
            </div>
            {/* <h3>{name}</h3> */}
            <ul>
                <li className="title">Correo Electrónico</li>
                <li>{email}</li>
            </ul>
        </Card>
    );
};

export default ProfileCard;
