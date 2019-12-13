import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className="ourbar">
                <NavLink to="/" className="navbar-item">
                    <img src={require("../images/list.png")} className="navbar-icons"/>
                </NavLink>
                <NavLink to="/my-feed" className="navbar-item">
                    <img src={require("../images/social.png")} className="navbar-icons"/>
                </NavLink>
                <NavLink to="/my-friends" className="navbar-item">
                    <img src={require("../images/user.png")} className="navbar-icons"/>
                </NavLink>
                <NavLink to ="/profile" className="navbar-item">
                    <img src={require("../images/cog.png")} className="navbar-icons"/>
                </NavLink>
            </nav>
        </div>
    )
}
