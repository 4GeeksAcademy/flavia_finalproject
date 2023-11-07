import React from 'react';
import { useNavigate } from "react-router-dom";

export const UserAppointmentsCard = ({ user_type, freelance_full_name, user_email, professional_registration_number, email, full_date }) => {
    const navigate = useNavigate();

    const handle_toVideocall = () => {
        navigate("/videocall");
    }
    return (
        <>
        {user_type === "User" ? (
            <section>
                <div>
                    <h6>Profesional: {freelance_full_name}</h6>
                    <p>{professional_registration_number}</p>
                    <p>{email}</p>
                </div>
                <div>
                    {full_date}
                </div>
                <button onClick={() => handle_toVideocall()}>ir a la videollamada</button>
            </section>
        ) : (
            <div>
                <p>Hello World</p>
            </div>
        )}
    </>
    )
}