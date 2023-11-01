import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Confirmation } from './confirmation';

export const Availability = ({ availability, freelanceId }) => {
    const { store, actions } = useContext(Context);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

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
                                <button key={hour} onClick={() => handle_schedule_appointment(day, hour)} type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >{hour}</button>
                            ))}
                        </div>
                        {confirmationOpen ? <Confirmation selectedDay={selectedDay} selectedHour={selectedHour} /> : ""}
                    </div>
                )
            })}
        </div>
    );
}
