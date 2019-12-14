import React from 'react';

export const Content = ({conf}) => {
    return (
        <div className="card">
            <div className="card-header">{conf.name}</div>
            <div className="card-body">
                <div className="card-title">Seats: {conf.seats}</div>
                <div className="card-title">Time: {conf.dateTime}</div>
            </div>
        </div>
    )
};
