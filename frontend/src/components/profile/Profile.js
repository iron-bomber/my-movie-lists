import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

const Profile = (props) => {
    // if(!props.user.email){ 
    //     props.history.push('/log-in') 
    // }

    return (
        <div>
            {/* Welcome {props.user.email} !!!  */}
         {/* {this.state.email ? 
            <div>
            <NavLink onClick={this.logOut} to='/'>Log Out</NavLink> 

            </div>
           :
           <div>
              <NavLink to="/sign-up">Sign Up</NavLink>
              <NavLink to="/log-in">Log In</NavLink>
           </div>
          } */}
        </div>
    );
}

export default Profile;