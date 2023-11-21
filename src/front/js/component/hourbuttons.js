import React, { useContext } from 'react';
import { Confirmation } from './confirmation';
import { Context } from "../store/appContext";
import "../../styles/hourbuttons.css"

export const HourButtons = ({ numericDate, freelanceId, hours, handleHourClick, selectedDay, selectedHour, confirmationOpen }) => {
    const { store, actions } = useContext(Context);

    // Obtiene el nombre del día de la semana (por ejemplo, "lunes", "martes", etc.)
    const formattedDay = selectedDay ? selectedDay.toLocaleDateString('en-US', { weekday: 'long' }) : '';
    
    // Formatea la fecha seleccionada en el calendario en el formato de día (número), mes (nombre completo) y año (número)
    const formattedDate = selectedDay ? selectedDay.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    // Verifica si un botón de hora debe estar deshabilitado
    const isButtonDisabled = (time) => {
         // Comprueba si existe alguna cita programada en la hora específica
        return store.freelance_appointments.some(appointment => appointment.time === time);
    }

    return (
        <div className="hour-buttons-container">
            {Array.isArray(hours) && hours.length > 0 && hours.map((hour, index) => (
                <button key={index} className="hour-button" onClick={() => handleHourClick(hour)} disabled={isButtonDisabled(hour)}>
                    {hour}
                </button>

            ))}
            {confirmationOpen && <Confirmation freelanceId={freelanceId} numericDate={numericDate} selectedDay={formattedDay}
                selectedDate={formattedDate}
                selectedHour={selectedHour} />}
        </div>
    );
};