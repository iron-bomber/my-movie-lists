import React, { Component, Fragment } from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import actions from '../services/index'
import NotLoggedIn from './notLoggedIn';


export default class Movie extends Component {

    state = {
        rating: null,
        review: '',
        status: 'completed',
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        this.apiGets()
        this.checkStatus()
    }

    checkStatus = () =>{
        console.log('hi', this.props.user)
        if(this.props.user){
            let ok = this.props.user.movieList.find((each)=>{
                return each.movie.tmdbID == this.props.match.params.id
            })
            if(ok){
                let completed;
                if (ok.status == 'completed'){
                    completed = true;
                } else {
                    completed = false;
                }
                console.log(ok)
                this.setState({
                    rating: ok.review.rating,
                    review: ok.review.review,
                    status: ok.status,
                    found: true,
                    id: ok.review._id,
                    completed: completed
                })
            }
        }
        
    }

    apiGets = () =>{
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&page=1&include_adult=false`)
        .then((res)=>{
            this.setState({
                movie: res.data
            })
            axios.get(`https://image.tmdb.org/t/p/w500${res.data.poster_path}`)
            // axios.get(`https://image.tmdb.org/t/p/w500/ZQixhAZx6fH1VNafFXsqa1B8QI.jpg`)
            .then((res2)=>{
                this.setState({
                    poster: res2.config.url
                })
            })
            .catch((err2)=>{
                console.log(err2)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    reroute = () =>{
        this.props.updateData();
        this.props.history.push('/')
    }

    submitForm = async (e) =>{
        e.preventDefault()
        if(!this.props.user._id){
            this.props.history.push('/log-in');
        }
        let subData = {
            rating: this.state.rating,
            review: this.state.review,
            movie: this.state.movie,
            user: this.props.user._id,
            img: this.state.poster,
            status: this.state.status
        }
        if(this.state.found){
            let updatedReview = {
                review: this.state.review,
                rating: this.state.rating,
                status: this.state.status,
                id: this.state.id
            }
            await actions.updateReview(updatedReview)
            this.reroute();
        }else{
            let newMovie = await actions.addMovie(subData);
            this.reroute();
        }
    }
    
    render() {
        console.log('123 ', this.state.status, this.state.completed);
        if (this.props.user){
                    return (
            <div>
                {this.state.movie && 
                    <div className="one-movie-result">
                    <div className="listing-img">
                        <img src={this.state.poster} alt="img" className="poster-size"/>
                    </div>
                    <div className="listing info">
                        <h1>
                            {this.state.movie.original_title} 
                        </h1>
                        <h3>
                            {this.truncDate(this.state.movie.release_date)}
                        </h3>
                        <p className="description">
                            {this.state.movie.overview}
                        </p>
                    </div>
                </div>
                }
                <div>
                <select onChange={this.handleChange} name="status" value={this.state.value}>
                    {this.state.completed &&
                        <Fragment>
                            <option value="completed" selected>Completed</option>
                            <option value="want-to-watch">Wanna watch</option>
                        </Fragment>
                    }
                    {!this.state.completed &&
                        <Fragment>
                            <option value="completed">Completed</option>
                            <option value="want-to-watch" selected>Wanna watch</option>
                        </Fragment>
                    }
                </select>
                    <h2>Rate It</h2>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={10}
                        value={this.state.rating}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div>
                    <h2>What did you think of it?</h2>
                    <br />
                    <textarea className="review-input" name="review" value={this.state.review} onChange={this.handleChange}/>
                </div>
                <div>
                    <button className="submit-rating" onClick={this.submitForm}>
                        Submit
                    </button>
                </div>
            </div>
        )
        } else {
            return <NotLoggedIn/>
        }
    }
}