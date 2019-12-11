import React, { Component } from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';

export default class CreatePost extends Component {

    state = {
        rating: 0
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&page=1&include_adult=false`)
        .then((res)=>{
            this.setState({
                movie: res.data
            })
            console.log(res.data)
            axios.get(`https://image.tmdb.org/t/p/w500${res.data.poster_path}`)
            .then((res2)=>{
                console.log(res2)
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

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    reroute = () =>{
        this.props.history.push('/')
    }
    
    render() {
        console.log(this.state.movie)
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
                    <h2>Rate It</h2>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={10}
                        value={this.state.rating}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div>
                    <h2>Leave your thoughts</h2>
                    <br />
                    <textarea className="review-input"/>
                </div>
                <div>
                    <button className="submit-rating">
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}