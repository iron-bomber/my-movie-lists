import React, { Component } from 'react'
import axios from 'axios'

export default class CreatePost extends Component {

    state = {

    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        console.log(this.props.location.each)
        axios.get(`https://image.tmdb.org/t/p/w500${this.props.location.each.each.poster_path}`)
        .then((res)=>{
            console.log(res)
            this.setState({
                poster: res.config.url
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        this.setState({
            movie: this.props.location.each
        })

    }

    render() {
        return (
            <div>
                {this.state.movie &&
                    <div className="one-movie-result">
                    <img src={this.state.poster} alt="img" className="poster-size"/>
                    <h1>
                        {this.state.movie.each.original_title} 
                    </h1>
                    <h2>
                        {this.truncDate(this.state.movie.each.release_date)}
                    </h2>
                    <h5 className="description">
                        {this.state.movie.each.overview}
                    </h5>
                </div>
                }
            </div>
        )
    }
}