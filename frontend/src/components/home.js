import React, { Component } from 'react'
import MyList from './myList';
import { NavLink } from 'react-router-dom';
import NotLoggedIn from './notLoggedIn';
import LandingPage from './LandingPage';

export default class Home extends Component {

    render(){
        return (
            <div>
                {this.props.user &&
                    <div>
                        <MyList {...this.props} user={this.props.user} updateData={this.props.updateData}/>
                    </div>
                }
                {!this.props.user &&
                    <LandingPage/>
                }    
            </div>
        )
    }
}
