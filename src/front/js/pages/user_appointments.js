import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/user_appointments.css";
import { UserAppointmentsCard } from "../component/userAppointmentsCard";

export const UserAppointments = () => {
    const { store, actions } = useContext(Context)
    const accessToken = sessionStorage.getItem('accessToken');
    useEffect(() => {
        actions.individualAllAppointments(accessToken);

        // Accede a store.user_type después de que individualAllAppointments haya terminado
        const user_type = store.user_type;
        console.log(user_type);
    }, [store.user_type]);
    return (
        <>
            {
                store.individual_appointments.map((item, index) => (
                    < UserAppointmentsCard user_type={store.user_type} freelance_full_name={item.freelance_data.full_name} user_email={item.user_data.email} professional_registration_number={item.freelance_data.
                        professional_registration_number} email={item.freelance_data.email} full_date={item.full_date} />
                ))
            }
        </>
    );
};
