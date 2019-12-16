import React from 'react'
import { NavLink } from 'react-router-dom';
import {FiList} from 'react-icons/fi'
import {IoMdPeople, IoIosJournal, IoMdSettings} from 'react-icons/io'
import {MdSettings} from 'react-icons/md'
import {TiMessage} from 'react-icons/ti'

export default function Navbar() {
    return (
        <div>
            <nav className="ourbar">
                <NavLink to="/" className="navbar-item">
                    <IoIosJournal className="navbar-icons"/>
                </NavLink>
                <NavLink to="/my-feed" className="navbar-item">
                    <TiMessage className="navbar-icons"/>
                </NavLink>
                <NavLink to="/my-friends" className="navbar-item">
                    <IoMdPeople className="navbar-icons"/>
                </NavLink>
                <NavLink to ="/profile" className="last-navbar-item">
                    <MdSettings className="navbar-icons"/>
                </NavLink>
            </nav>
        </div>
    )
}
