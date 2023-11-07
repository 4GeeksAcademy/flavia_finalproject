import React from 'react';
import { useNavigate } from "react-router-dom";

export const UserAppointmentsCard = ({ full_name, professional_registration_number, email, full_date }) => {
    const navigate = useNavigate();

    const handle_toVideocall = () => {
        navigate("/videocall");
    }
    return (
        <section>
            <div>
                <h6>{full_name}</h6>
                <p>{professional_registration_number}</p>
                <p>{email}</p>
            </div>
            <div>
                {full_date}
            </div>
            <button onClick={() => handle_toVideocall()}>ir a la videollamada</button>
        </section>
    )
}