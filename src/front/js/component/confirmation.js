import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from './payment';

export const Confirmation = ({ freelanceId, selectedDay, selectedHour, selectedDate }) => {
    const { store, actions } = useContext(Context)
    console.log('selectedDay', selectedDay, 'selectedHour', selectedHour, 'selectedDate', selectedDate)
    const navigate = useNavigate();
    const handle_toPaymentNavigation = () => {
        navigate("/payment");
        console.log('holaaaaaaaaaaa')
        actions.confirmedAppointment(freelanceId, selectedDate, selectedHour)
        actions.appointment_data({
            selectedDay: selectedDay,
            selectedHour: selectedHour,
            selectedDate: selectedDate
        })
    }

    return (
        <div>
            <h1>On {selectedDay}, {selectedDate}, at {selectedHour}</h1>
            <button onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
        </div>

    )
}