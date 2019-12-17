import React from 'react';
// import {NavLink} from 'react-router-dom'
import ChangeInfo from '../changeInfo'

class Profile extends React.Component {

    state = {

    }
    
    render(){
        if(!this.props.user){ 
            this.props.history.push('/log-in') 
        }
        return (
            <div>
            Profile
                <button onClick={() => this.props.logOut(this.props.history)}>Log out</button>

            <ChangeInfo />
            </div>
        );
    }
}

export default Profile;