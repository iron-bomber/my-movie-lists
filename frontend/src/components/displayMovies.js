import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class displayMovies extends Component {

    state = {

    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        let sorted = this.props.movies.data.results.sort((a,b)=>{
            if(a.popularity < b.popularity){
                return 1
            }
            else if(a.popularity > b.popularity){
                return -1
            }
            else{
                return 0
            }
        })
        this.setState({
            sorted: sorted
        })
    }

    showMovies = () =>{
        return this.state.sorted.map(each=>{
            return (
                <div className="one-movie-result">
                    <h1>
                        {each.original_title} 
                        <Link to={{
                        pathname: '/create',
                        each: {
                            each
                        }}}>
                            Add it
                        </Link>
                    </h1>
                    <h2>
                        {this.truncDate(each.release_date)}
                    </h2>
                    <h5 className="description">
                        {each.overview}
                    </h5>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.state.sorted && 
                    this.showMovies()
                }
            </div>
        )
    }
}
