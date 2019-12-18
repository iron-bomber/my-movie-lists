import React, { Component } from 'react';
import NotLoggedIn from './notLoggedIn';
import actions from '../services';

export default class feed extends Component {


    componentDidMount(){
        this.populateFeed();
    }

    populateFeed = async () => {
        let theFeed = await actions.populateFeed(this.props.user.feed);
        console.log(theFeed);
    }

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
