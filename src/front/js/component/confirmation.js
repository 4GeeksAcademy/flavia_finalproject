import React, { useEffect } from 'react';
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from './payment';

export const Confirmation = ({ selectedDay, selectedHour, selectedDate }) => {
    console.log('selectedDay', selectedDay, 'selectedHour', selectedHour)
    const navigate = useNavigate();
    const handle_toPaymentNavigation = () => {
        navigate("/payment");
        console.log('holaaaaaaaaaaa')
    }

    return (
        <div>
            <h1>On {selectedDay}, {selectedDate}, at {selectedHour}</h1>
            <button onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
        </div>

    )
}