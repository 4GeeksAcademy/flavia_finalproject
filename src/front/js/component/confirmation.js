import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from '../pages/payment';

export const Confirmation = ({ freelanceId, selectedDay, selectedHour, selectedDate, numericDate }) => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem('accessToken');

    // Función que maneja la navegación a la página de pago
    const handle_toPaymentNavigation = () => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            // Si no hay token de acceso, redirigir al login
            navigate("/login");
        } else {
            actions.myAccount(accessToken)
                .then(data => {
                    if (data) {
                        navigate("/payment");
                        actions.confirmedAppointment(freelanceId, numericDate, selectedHour)}
                    })
                .catch(err => {
                    console.error("Error during account verification:", err);
                    navigate("/login");
                });
        }
    };

    return (
        <div>
            <h1>On {selectedDay}, {selectedDate}, at {selectedHour}</h1>
            <button onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
        </div>

    )
}