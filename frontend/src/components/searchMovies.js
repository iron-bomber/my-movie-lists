import React, { Component } from 'react'
import DisplayMovies from './displayMovies'
import axios from 'axios'


export default class add extends Component {

    state = {

    }

    updateValues = (e) =>{
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    searchApi = (e) =>{
        e.preventDefault()
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&query=${this.state.search}&page=1&include_adult=false`)
        .then((res)=>{
          this.setState({
            movies: res
          })
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    render() {
        return (
            <div>
            <form onSubmit={this.searchApi}>
          <input type="text" name="search" placeholder="Search" onChange={this.updateValues} />
        </form>
        {this.state.movies &&
          <div>
            <DisplayMovies movies = {this.state.movies} />
          </div>
        }
            </div>
        )
    }
}
