import React, { Component } from 'react'
import MyList from './myList';
import { NavLink } from 'react-router-dom';

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
}
