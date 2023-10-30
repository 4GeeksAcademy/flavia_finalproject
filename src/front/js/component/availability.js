import React, { useContext } from 'react';
import { Context } from "../store/appContext";

export const Availability = ({ availability, freelanceId }) => {
    const { store, actions } = useContext(Context);

    const generateHourRange = (start, end) => {
        const hours = [];
        for (let i = start; i <= end; i++) {
            hours.push(`${i}:00`);
        }
        return hours;
    }

    const handle_schedule_appointment = (day, hour) => {
        const appointmentInfo = {
            freelance_id: freelanceId,
            day: day,
            time: hour
        };
        actions.scheduleAppointment(appointmentInfo);
    }

    return (
        <div>
            <h1>Disponibilidad</h1>
            {Object.entries(availability).map(([day, hours]) => {
                const [startHour, endHour] = hours.split(' - ').map(time => parseInt(time));
                console.log('start', startHour, 'end', endHour)
                return (
                    <div key={day}>
                        <h2>{day}</h2>
                        <div>
                            {generateHourRange(startHour, endHour).map(hour => (
                                <button key={hour} onClick={() => handle_schedule_appointment(day, hour)}>{hour}</button>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
