import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/user_appointments.css";

export const UserAppointments = () => {
    const { store, actions } = useContext(Context)
    return (
        <h1>hello world from user's appointments</h1>
    );
};
