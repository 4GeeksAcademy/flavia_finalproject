import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";

export const Notification = ({ message }) => {
    const { store, actions } = useContext(Context);
    useEffect(()=>{
        const appointment = store.appointment;
        console.log('appointment', appointment)
        actions.scheduleAppointment(appointment)
    }, [])
    return (
        <div className="notification">
            <h1>hello world from notification</h1>
            {message}
        </div>
    );
}

