import React from 'react';
import { useNavigate } from "react-router-dom";

export const UserAppointmentsCard = ({ jitsiRoomId, user_type, freelance_full_name, user_full_name, user_email, freelance_email, full_date }) => {
    const navigate = useNavigate();

    const handle_toVideocall = (jitsiRoomId) => {
        navigate(`/videocall/${jitsiRoomId}`);
    }
    return (
        <>
            {user_type === "User" ? (
                <section>
                    <div>
                        <h6>Profesional: {freelance_full_name}</h6>
                        <p>{freelance_email}</p>
                    </div>
                    <div>
                        {full_date}
                    </div>
                    <button onClick={() => handle_toVideocall(jitsiRoomId)}>ir a la videollamada</button>
                </section>
            ) : (
                <section>
                    <div>
                        <h6>Paciente: {user_full_name}</h6>
                        <p>{user_email}</p>
                    </div>
                    <div>
                        {full_date}
                    </div>
                    <button onClick={() => handle_toVideocall(jitsiRoomId)}>ir a la videollamada</button>
                </section>
            )}
        </>
    )
}