import React from 'react';
import { Confirmation } from './confirmation';

export const HourButtons = ({ hours, handleHourClick, selectedDay, selectedHour, confirmationOpen }) => {
    const formattedDay = selectedDay ? selectedDay.toLocaleDateString('en-US', { weekday: 'long' }) : '';
    const formattedDate = selectedDay ? selectedDay.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const formattedHour = selectedHour ? selectedHour.toString() : '';
    console.log(confirmationOpen, 'componentehourbutton confirmationopen')
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