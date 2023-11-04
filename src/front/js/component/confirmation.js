import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from './payment';

export const Confirmation = ({ freelanceId, selectedDay, selectedHour, selectedDate, numericDate }) => {
    const { store, actions } = useContext(Context)
    
    const navigate = useNavigate();
    
    const handle_toPaymentNavigation = () => {
        navigate("/payment");
        actions.confirmedAppointment(freelanceId, numericDate, selectedHour)
    }

    return (
        <div>
            <h1>On {selectedDay}, {selectedDate}, at {selectedHour}</h1>
            <button onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
        </div>

    )
}