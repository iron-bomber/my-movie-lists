import React from 'react';
import {NavLink} from 'react-router-dom'

export default function notLoggedIn() {
    return (
        <div>
            You are not currently logged in.
            <nav>
                <NavLink to="/log-in" className="nav-link">login</NavLink>
                <NavLink to="/sign-up" className="nav-link">signup</NavLink>
            </nav>
        </div>
    )
}
