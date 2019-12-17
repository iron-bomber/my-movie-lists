import React, { Component } from 'react';
import NotLoggedIn from './notLoggedIn';

export default class feed extends Component {
    render() {
        if (this.props.user){  
            return (
                <div>
                    Feed
                </div>
            )
        } else {
            return <NotLoggedIn/>
        }
    }

}
