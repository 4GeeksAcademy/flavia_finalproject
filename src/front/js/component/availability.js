import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext";
import { Confirmation } from './confirmation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HourButtons } from './hourbuttons';

export const Availability = ({ freelanceId }) => {
    const { store, actions } = useContext(Context);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [numericDate, setNumericDate] = useState(null)
   

    useEffect(() => {
        // Resetea el estado cuando la disponibilidad cambia
        setSelectedDay(null);
        setSelectedHour(null);
        setSelectedAvailability([]);
        setConfirmationOpen(false);
    }, [store.availability]);

    const handleHourClick = (hour) => {
        // Abre la confirmación y actualiza la hora seleccionada
        setConfirmationOpen(true);
        const formattedHour = hour.padStart(5, '0');
        setSelectedHour(formattedHour);
        console.log('selectedhour en availability', selectedHour)
    }


    const generateHourRange = (start, end) => {
        // Genera un rango de horas entre 'start' y 'end'
        const hours = [];
        for (let i = start; i <= end; i++) {
            const formattedHour = i.toString().padStart(2, '0') + ':00';
            hours.push(formattedHour);
        }
        return hours;
    }

    const availableDays = Object.keys(store.availability)

    return (
        <div>
            <Calendar
                tileDisabled={({ activeStartDate, date, view }) => {
                    if (view === 'month') {
                        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                        return !availableDays.includes(dayOfWeek);
                    }
                    return false; // Habilita todos los días en otras vistas
                }}
                onClickDay={(date) => {
                    // Obtiene el nombre del día de la semana (por ejemplo, "lunes", "martes", etc.)
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                    // Verifica si hay disponibilidad para el día de la semana seleccionado
                    const horario = store.availability[dayOfWeek];

                    if (horario) {
                        // Si hay disponibilidad, obtiene el rango de horas (por ejemplo, "08:00 - 17:00")
                        const [start, end] = horario.split(' - ');

                        // Convierte las horas de inicio y fin a números enteros
                        const startHour = Number(start.split(':')[0]);
                        const endHour = Number(end.split(':')[0]);

                        // Genera un rango de horas entre el inicio y el fin
                        const hours = generateHourRange(startHour, endHour);

                        // Obtiene la fecha en formato numérico (por ejemplo, "2023-11-04")
                        const numericDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                        
                         // Actualiza el estado local con la fecha seleccionada y las horas disponibles
                        setNumericDate(numericDate);
                        setSelectedDay(date)
                        console.log('numericDate en availability', numericDate)
                        setConfirmationOpen(false);
                        setSelectedAvailability(hours);

                        // Llama a la acción que obtiene las citas disponibles para el freelance en la fecha seleccionada
                        actions.freelance_appointments(freelanceId, numericDate)
                    } else {
                        alert(`No hay disponibilidad para ${dayOfWeek}`);
                    }
                }}
            />
            {Object.keys(selectedAvailability).length > 0 && (
                <HourButtons numericDate={numericDate} freelanceId={freelanceId} hours={selectedAvailability} handleHourClick={handleHourClick} selectedDay={selectedDay} selectedHour={selectedHour} confirmationOpen={confirmationOpen} />
            )}
        </div>
    );
};