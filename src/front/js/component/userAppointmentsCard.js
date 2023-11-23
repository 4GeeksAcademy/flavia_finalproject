import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/userAppointmentsCard.css";

export const UserAppointmentsCard = ({ jitsiRoomId, user_type, freelance_full_name, user_full_name, user_email, freelance_email, full_date }) => {
    const navigate = useNavigate();

    const handle_toVideocall = (jitsiRoomId) => {
        navigate(`/videocall/${jitsiRoomId}`);
    }
    return (
        <>
            {user_type === "User" ? (
                <section className='user-appointment-section'>
                    <div className='user-appointment-info'>
                        <h6>Nutritionist: {freelance_full_name}</h6>
                        <p>{freelance_email}</p>
                    </div>
                    <div>
                        {full_date}
                    </div>
                    <button onClick={() => handle_toVideocall(jitsiRoomId)}>Go to the video call</button>
                </section>
            ) : (
                <section className='user-appointment-section'>
                    <div className='user-appointment-info'>
                        <h6>Pacient: {user_full_name}</h6>
                        <p>{user_email}</p>
                    </div>
                    <div>
                        {full_date}
                    </div>
                    <button onClick={() => handle_toVideocall(jitsiRoomId)}>Go to the video call</button>
                </section>
            )}
        </>
    )
}