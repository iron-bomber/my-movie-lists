import React, { Component } from 'react'
import DisplayMovies from './displayMovies'
import axios from 'axios'
import { FaSearch } from "react-icons/fa"


export default class add extends Component {

    state = {
      type: "movie",
      search: "",
    }

    updateValues = (e) =>{
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    searchApi = (e) =>{
        e.preventDefault()
        console.log(this.state)
        axios.get(`https://api.themoviedb.org/3/search/${this.state.type}?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&query=${this.state.search}&page=1&include_adult=false`)
        .then((res)=>{
          this.setState({
            results: res.data.results
          }, ()=>{      console.log(this.state)      
          
                this.state.results.sort((a,b)=>{
                  if(a.popularity < b.popularity){
                      return 1
                  }
                  else if(a.popularity > b.popularity){
                      return -1
                  }
                  else{
                      return 0
                  }
                  }).map( async each=>{
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
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    render() {
        return (
            <div>
              <div className="d-flex justify-content-center mt-4">
                <form className="form-inline" onSubmit={this.searchApi}>
                  <select className="form-control" onChange={this.updateValues} name="type">
                      <option value="movie">Movies</option>
                      <option value="tv">Shows</option>
                  </select>
                  <input type="text" className="form-control" name="search" placeholder="Search" onChange={this.updateValues} />
                  <button type="submit" className="btn"><FaSearch/></button>
                </form>
              </div>
              {this.state.results &&
                <div>
                  <DisplayMovies state = {this.state} />
                </div>
              }
            </div>
        )
    }
}