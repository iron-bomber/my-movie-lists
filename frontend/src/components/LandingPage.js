import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


export default class LandingPage extends Component {
    render() {
        return (
            <div className="background-landing">
                <div className="landing-logo">
                    <h4>My Movie List</h4>
                </div>
                <div className="image-container">
                    <div className="whole-landing-page">
                    </div>
                </div>
                <div className="landing-text">
                    <h1></h1>
                    <h4></h4>
                    <div>
                        <NavLink to="/log-in" className="btn btn-primary mr-2">Login</NavLink>
                        <NavLink to="/sign-up" className="btn btn-secondary">Signup</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
