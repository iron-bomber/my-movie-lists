import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class displayMovies extends Component {

    state = {
        posters: [],
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    showMovies = () =>{
        return this.props.state.movies.map((each, i)=>{
            return (
                <div className="one-movie-result">
                <div className="listing-img">
                    {this.props.state[each.id] &&
                    <div>
                        <img src={this.props.state[each.id]} alt="img" className="poster-size"/>
                        <Link to={{
                        pathname: `/movies/${each.id}`,
                        each: {
                            each
                        }}} className="listing-add-btn">
                            Add it
                        </Link>
                        </div>
                    }
                </div>
                <div className="listing-info">
                    <h3>
                        {each.original_title} 
                    </h3>
                    <h4>
                    {each.release_date &&
                        <div>
                        {this.truncDate(each.release_date)}
                        </div>
                    }
                    </h4>
                    <p className="description">
                        {each.overview}
                    </p>
                </div>
                </div>
                    
            )
        })
    }

    render() {
        console.log('rerendering', this.props)
        return (
            <div>
                {this.showMovies()}
            </div>
        )
    }
}