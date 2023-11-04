import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";

export const Notification = ({ message }) => {
    const { store, actions } = useContext(Context);

    const addToCalendar = () => {
        const { selectedDay, selectedHour, selectedDate } = store.appointment_data;

        
    }

    useEffect(() => {
        const appointment = store.appointment;
        console.log('appointment', appointment)
        actions.scheduleAppointment(appointment)
    }, [])
    return (
        <div className="notification">
            <h1>hello world from notification</h1>
            {message}
            <button onClick={addToCalendar}>agregar a calendar</button>
        </div>
    );
}

