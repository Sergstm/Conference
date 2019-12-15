import React from 'react';


export const Conference = () => {
    return (
        <div>
            Conference name
            <div className="input-group input-group-sm mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Name</span>
                </div>
                <input type="text" className="form-control" maxLength="150" name="name"/>
            </div>
            Quantity of seats
            <div className="input-group input-group-sm mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Seats</span>
                </div>
                <input type="number" className="form-control" name="seats"/>
            </div>
            Conference date
            <div className="input-group input-group-sm mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Date</span>
                </div>
                <input type="date" className="form-control" name="date"/>
            </div>
            Conference time
            <div className="input-group input-group-sm mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">Time</span>
                </div>
                <input type="time" className="form-control" name="time"/>
            </div>
        </div>
    )
};
