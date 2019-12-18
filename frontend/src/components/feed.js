import React, { Component } from 'react';
import NotLoggedIn from './notLoggedIn';
import actions from '../services';

export default class feed extends Component {

    state = {
        feed: null,
    }

    componentDidMount(){
        if (this.props.user){
            this.populateFeed();
        }
    }

    populateFeed = async () => {
        let theFeed = await actions.populateFeed(this.props.user.feed);
        console.log(theFeed);
        this.setState({
            feed: theFeed.data.feed
        })
    }

    displayFeed = () => {
        return this.state.feed.map((feedItem) => {
            return (
                <div>
                    <h4>{feedItem.user.firstName} {feedItem.user.lastName} {feedItem.status} {feedItem.movie.name}</h4>
                </div>
            )
        })
    }

    render() {
        if (this.props.user){  
            return (
                <div>
                    {this.state.feed &&
                        <div>
                            {this.displayFeed()}
                        </div>
                    }
                    {!this.state.feed &&
                        <div>
                            Loading...
                        </div>
                    }
                </div>
            )
        } else {
            return <NotLoggedIn/>
        }
    }

}
