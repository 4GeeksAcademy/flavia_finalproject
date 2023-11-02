import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Confirmation } from './confirmation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Availability = ({ availability, freelanceId }) => {
    const { store, actions } = useContext(Context);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState({
        "Thursday": "13:00 - 21:00",
        "Tuesday": "8:00 - 16:00"
    });

    const HourButtons = ({ hours, handleHourClick }) => {
        return (
            <div>
                {hours.map((hour, index) => (
                    <button key={index} onClick={() => handleHourClick(hour)}>
                        {hour}
                    </button>
                ))}
            </div>
        );
    };

    const generateHourRange = (start, end) => {
        const hours = [];
        for (let i = start; i <= end; i++) {
            hours.push(`${i}:00`);
        }
        return hours;
    }

    const handle_schedule_appointment = (day, hour) => {
        console.log('hour', hour)
        setConfirmationOpen(true);
        setSelectedDay(day);
        setSelectedHour(hour);
        actions.confirmedAppointment(freelanceId, day, hour)
    }


    const handleHourClick = (hour) => {
        const selectedDateTime = new Date(selectedDay);
        const [startHour, endHour] = hour.split(' - ');

        selectedDateTime.setHours(Number(startHour.split(':')[0]));
        const startMinute = Number(startHour.split(':')[1]);
        selectedDateTime.setMinutes(startMinute);

        const endDateTime = new Date(selectedDay);
        endDateTime.setHours(Number(endHour.split(':')[0]));
        const endMinute = Number(endHour.split(':')[1]);
        endDateTime.setMinutes(endMinute);

        const selectedAvailability = {
            start: selectedDateTime,
            end: endDateTime
        };

        setSelectedAvailability(selectedAvailability);
        setConfirmationOpen(true);
    }
    const availableDays = Object.keys(availability).map(day => {
        switch (day) {
            case 'Lunes': return 'Monday';
            case 'Martes': return 'Tuesday';
            case 'Miércoles': return 'Wednesday';
            case 'Jueves': return 'Thursday';
            case 'Viernes': return 'Friday';
            case 'Sábado': return 'Saturday';
            case 'Domingo': return 'Sunday';
            default: return '';
        }
    });

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
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const horario = disponibilidad[dayOfWeek];
                    if (horario) {
                        const [start, end] = horario.split(' - ');
                        const startHour = Number(start.split(':')[0]);
                        const endHour = Number(end.split(':')[0]);
                        const hours = generateHourRange(startHour, endHour);
                        setSelectedDay(date);
                        setSelectedAvailability(hours); // Cambiado de objeto a array
                        setConfirmationOpen(false);
                    } else {
                        alert(`No hay disponibilidad para ${dayOfWeek}`);
                    }
                }}
            />
            {Object.keys(selectedAvailability).length > 0 && (
                <HourButtons hours={selectedAvailability} handleHourClick={handleHourClick} />
            )}
        </div>
    );
};
