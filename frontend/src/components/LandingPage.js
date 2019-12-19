import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Login from '../components/auth/LogIn'


export default class LandingPage extends Component {
    render() {
        console.log(this.props)
        return (
        <div className="whole-landing-page">
             <div>
                <div className="landing-logo">
                    <h4 className="mml">My Movie List</h4>
                    <div className="login-div">
                        <Login setUser = {this.props.setUser}/>
                    </div>
                </div>
                <div className="landing-text">
                    <h1>Whatcha watchin?</h1>
                    <h4 className="mml-text">Keep track of the movies you've seen and want to see. 
                    <br />
                    Share your lists with your friends.</h4>
                    <div className="mml-text">
                        <NavLink to="/sign-up" className="btn btn-secondary">Signup</NavLink>
                    </div>
                </div>
            </div> 
        </div>
        )
    }
}
