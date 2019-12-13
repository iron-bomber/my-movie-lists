import React, { Component } from 'react'
import MyList from './myList';
import { NavLink } from 'react-router-dom';

export default function Home (props){
    return (
        <div>
            {props.user &&
                <div>
                    <h2>Welcome, {props.user.firstName}!</h2>
                    <MyList {...props} user={props.user}/>
                </div>
            }
            {!props.user &&
                <div>
                    You are not currently logged in.
                    <nav>
                        <NavLink to="/log-in" className="nav-link">login</NavLink>
                        <NavLink to="/sign-up" className="nav-link">signup</NavLink>
                    </nav>

                </div>
            }    
        </div>
    )
}
