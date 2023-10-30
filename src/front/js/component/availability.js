import React from 'react';

export const Availability = ({ availability }) => {
    const generateHourRange = (start, end) => {
        const hours = [];
        for (let i = start; i <= end; i++) {
            hours.push(`${i}:00 -${i + 1}:00`);
        }
        return hours;
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
                                <button key={hour}>{hour}</button>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
