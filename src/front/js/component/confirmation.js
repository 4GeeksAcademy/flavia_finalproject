import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from './payment';

export const Confirmation = ({ freelanceId, selectedDay, selectedHour, selectedDate, numericDate }) => {
    const { store, actions } = useContext(Context)
    console.log('selectedDay', selectedDay, 'selectedHour', selectedHour, 'selectedDate', selectedDate)
    const navigate = useNavigate();
    const handle_toPaymentNavigation = () => {
        navigate("/payment");
        console.log('holaaaaaaaaaaa')
        actions.confirmedAppointment(freelanceId, numericDate, selectedHour)
        actions.appointment_data({
            selectedHour: selectedHour,
            selectedDate: numericDate
        })
    }

    return (
        <div>
            <h1>On {selectedDay}, {selectedDate}, at {selectedHour}</h1>
            <button onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
        </div>

    )
}