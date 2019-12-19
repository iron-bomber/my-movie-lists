import React, { Component, Fragment } from 'react';
import NotLoggedIn from './notLoggedIn';
import actions from '../services';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

export default class feed extends Component {

    state = {
        feed: null,
    }

    componentDidMount(){
        if (this.props.user){
            this.populateFeed();
        }
    }

    componentDidUpdate(){
        if (this.props.user && !this.state.feed){
            this.populateFeed();
        }
    }

    populateFeed = async () => {
        console.log('18 ', this.props.user.feed)
        let theFeed = await actions.populateFeed(this.props.user.feed);
        console.log('20 ', theFeed);
        this.setState({
            feed: theFeed.data.feed
        })
    }

    displayFeed = () => {
        return this.state.feed.reverse().map((feedItem) => {
            console.log(feedItem);
            let theStatus;
            if (feedItem.status == 'want'){
                theStatus = 'wants to watch';
            } else {
                theStatus = 'finished watching';
            }
            return (
                <div className="col-3 feed-item mt-3">
                yesyesyes
                    {/* <div className="row">
                        <div className="col-6">
                            <h4><Link to={`/userpage/${feedItem.user._id}`}>{feedItem.user.firstName} {feedItem.user.lastName}</Link> {theStatus} <Link to={`/movie/${feedItem.movie.tmdbID}`}>{feedItem.movie.name}</Link></h4>
                            <img className="feed-image-size" src={feedItem.movie.img} alt="movie poster"/>
                        </div>
                        <div className="col-6">
                            {feedItem.review.rating &&
                                <Fragment>
                                    Their rating:
                                    <div className="rating-bg">
                                        <StarRatingComponent 
                                            starCount={10}
                                            value={feedItem.review.rating}
                                            className="list-star"
                                        />
                                    </div>
                                </Fragment>
                            }
                            {feedItem.review.review &&
                                <Fragment>
                                    Their review:
                                    <div>
                                        <p>
                                            {feedItem.review.review}
                                        </p>
                                    </div>
                                </Fragment> 
                            }
                            

                        </div>
                    </div> */}
                </div>
            )
        })
    }

    render() {
        if (this.props.user){  
            return (
                <Fragment>
                    {this.state.feed &&
                        <div className="container-fluid">
                            {this.displayFeed()}
                        </div>
                    }
                    {!this.state.feed &&
                        <div>
                            Loading...
                        </div>
                    }
                </Fragment>
            )
        } else {
            return <NotLoggedIn/>
        }
    }

}
