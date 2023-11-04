import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from '../pages/payment';

export const Confirmation = ({ freelanceId, selectedDay, selectedHour, selectedDate, numericDate }) => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate();

    // Función que maneja la navegación a la página de pago
    const handle_toPaymentNavigation = () => {
        navigate("/payment");
        actions.confirmedAppointment(freelanceId, numericDate, selectedHour) // La función actualiza store.appointment con el freelance en la fecha y hora seleccionadas por el usuario
    }

    return (
        <div>
            <h1>On {selectedDay}, {selectedDate}, at {selectedHour}</h1>
            <button onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
        </div>

    )
}