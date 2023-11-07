import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/user_appointments.css";
import { UserAppointmentsCard } from "../component/userAppointmentsCard";

export const UserAppointments = () => {
    const { store, actions } = useContext(Context)
    const accessToken = sessionStorage.getItem('accessToken');
    useEffect(() => {
        actions.userAllAppointments(accessToken)
    }, [])
    return (
        <>
            {
                store.user_appointments.map((item, index) => (
                    < UserAppointmentsCard full_name={item.freelance_data.full_name} professional_registration_number={item.freelance_data.
                        professional_registration_number} email={item.freelance_data.email} full_date={item.full_date} />
                ))
            }
        </>
    );
};
