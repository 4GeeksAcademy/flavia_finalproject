import React from 'react';

export const Notification = ({ message }) => {
    return (
        <div className="notification">
            <h1>hello world from notification</h1>
            {message}
        </div>
    );
}

