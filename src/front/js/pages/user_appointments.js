import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/user_appointments.css";
import { UserAppointmentsCard } from "../component/userAppointmentsCard";

export const UserAppointments = () => {
    const { store, actions } = useContext(Context)
    const accessToken = sessionStorage.getItem('accessToken');
    useEffect(() => {
        actions.individualAllAppointments(accessToken);
    }, [accessToken]);
    return (
        <div className="my-appointments-container">
        <h4 className="my-appointments">My appointments</h4>
            {
                store.individual_appointments.map((item, index) => (
                    < UserAppointmentsCard jitsiRoomId={item.jitsi_room_id} user_type={store.user_type} freelance_full_name={item.freelance_data.full_name} user_full_name={item.user_data.full_name} user_email={item.user_data.email} freelance_email={item.freelance_data.email} full_date={item.full_date} />
                ))
            }
        </div>
    );
};
