import React from 'react';
import {NavLink} from "react-router-dom";


export const Navigation = ({path, name}) => {
    return (
        <NavLink to={path}>
            <button className="btn btn-secondary nav-button">{name}</button>
        </NavLink>
    )
};
