import React, { Component } from 'react'

export default class CreatePost extends Component {

    state = {

    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        this.setState({
            movie: this.props.location.each
        })
    }

    render() {
        return (
            <div>
                {this.state.movie &&
                    <div className="one-movie-result">
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
