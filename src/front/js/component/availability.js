import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext";
import { Confirmation } from './confirmation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Availability = () => {
    const { store, actions } = useContext(Context);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedAvailability, setSelectedAvailability] = useState([]);

    const HourButtons = ({ hours, handleHourClick }) => {
        const formattedDay = selectedDay ? selectedDay.toLocaleDateString('en-US', { weekday: 'long' }) : '';
        const formattedDate = selectedDay ? selectedDay.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
        const formattedHour = selectedHour ? selectedHour.toString() : '';
        return (
            <div>
                {Array.isArray(hours) && hours.length > 0 && hours.map((hour, index) => (
                    <button key={index} onClick={() => handleHourClick(hour)}>
                        {hour}
                    </button>
                ))}
                {confirmationOpen && <Confirmation selectedDay={formattedDay}
                    selectedDate={formattedDate}
                    selectedHour={formattedHour} />}
            </div>
        );
    };
    useEffect(() => {
        setSelectedDay(null);
        setSelectedHour(null);
        setSelectedAvailability([]);
        setConfirmationOpen(false);
    }, [store.availability, confirmationOpen]);

    const handleHourClick = (hour) => {
        setConfirmationOpen(true);
        setSelectedHour(hour);
        console.log('selectedday', selectedDay)
        console.log('selectedhour', selectedHour)
    }


    const generateHourRange = (start, end) => {
        const hours = [];
        for (let i = start; i <= end; i++) {
            hours.push(`${i}:00`);
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
                        setSelectedDay(date);
                        setConfirmationOpen(false);
                        setSelectedAvailability(hours);
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