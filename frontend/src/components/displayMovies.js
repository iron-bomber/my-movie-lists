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
        console.log(sorted)
        this.setState({
            sorted: sorted,
        },()=>{
            this.state.sorted.map( async each=>{
                if(each.poster_path){
                    await axios.get(`https://image.tmdb.org/t/p/w500${each.poster_path}`)
                    .then((res)=>{
                        this.setState({
                            [each.id]: res.config.url
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                else{
                    await this.setState({
                        [each.id]: ''
                    })
                }
            })
        })
    }

    showMovies = () =>{
        return this.state.sorted.map((each, i)=>{
            return (
                <div className="one-movie-result">
                <div className="listing-img">
                    {this.state[each.id] &&
                        <img src={this.state[each.id]} alt="img" className="poster-size"/>
                    }
                </div>
                <div className="listing-info">
                    <h3>
                        {each.original_title} 
                        <Link to={{
                        pathname: `/movies/${each.id}`,
                        each: {
                            each
                        }}}>
                            Add it
                        </Link>
                    </h3>
                    <h4>
                        {this.truncDate(each.release_date)}
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
        return (
            <div>
                {this.state.sorted &&
                    this.showMovies()
                }
            </div>
        )
    }
}
