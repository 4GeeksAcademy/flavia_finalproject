import React, { useContext } from 'react';
import { Confirmation } from './confirmation';
import { Context } from "../store/appContext";

export const HourButtons = ({ freelanceId, hours, handleHourClick, selectedDay, selectedHour, confirmationOpen }) => {
    const { store, actions } = useContext(Context);
    const formattedDay = selectedDay ? selectedDay.toLocaleDateString('en-US', { weekday: 'long' }) : '';
    const formattedDate = selectedDay ? selectedDay.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const formattedHour = selectedHour ?
        selectedHour.toString().padStart(2, '0')
        : '00';

    const numericDate = selectedDay ?
        selectedDay.getFullYear() + '-' +
        ('0' + (selectedDay.getMonth() + 1)).slice(-2) + '-' +
        ('0' + selectedDay.getDate()).slice(-2)
        : '';

    const formattedDateTime = numericDate && formattedHour
        ? `${numericDate} ${formattedHour}:00`
        : '';
    console.log('formateddDatetime', formattedDateTime)
    const isButtonDisabled = store.freelance_appointments.some(appointment => appointment['full_date'] === formattedDateTime);
    console.log(isButtonDisabled)
    return (
        <div>
            {Array.isArray(hours) && hours.length > 0 && hours.map((hour, index) => (
                <button key={index} onClick={() => handleHourClick(hour)} disabled={isButtonDisabled && hour === formattedHour}>
                    {hour}
                </button>

            ))}
            {confirmationOpen && <Confirmation freelanceId={freelanceId} selectedDay={formattedDay}
                selectedDate={formattedDate}
                selectedHour={formattedHour} />}
        </div>
    );
};