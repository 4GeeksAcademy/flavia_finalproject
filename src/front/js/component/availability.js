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
    console.log('selectedavailability', selectedAvailability)
    useEffect(() => {
        setSelectedDay(null);
        setSelectedHour(null);
        setSelectedAvailability([]);
        setConfirmationOpen(false);
    }, [store.availability]);

    const handleHourClick = (hour) => {
        setConfirmationOpen(true);
        const formattedHour = hour.padStart(5, '0');
        setSelectedHour(formattedHour);
        console.log('selectedhour en availability', selectedHour)
    }


    const generateHourRange = (start, end) => {
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
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const horario = store.availability[dayOfWeek];
                    if (horario) {
                        const [start, end] = horario.split(' - ');
                        const startHour = Number(start.split(':')[0]);
                        const endHour = Number(end.split(':')[0]);
                        const hours = generateHourRange(startHour, endHour);
                        const numericDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                        setNumericDate(numericDate);
                        setSelectedDay(date)
                        console.log('numericDate en availability', numericDate)
                        setConfirmationOpen(false);
                        setSelectedAvailability(hours);
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