import React, { Component } from 'react'
import DisplayMovies from './displayMovies'
import axios from 'axios'


export default class add extends Component {

    state = {

    }

    updateValues = (e) =>{
        this.setState({
          [e.target.name]: e.target.value
        },()=>{      console.log(this.state)        })
    }

    searchApi = (e) =>{
        e.preventDefault()
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&query=${this.state.search}&page=1&include_adult=false`)
        .then((res)=>{
          this.setState({
            movies: res.data.results
          }, ()=>{      console.log(this.state)      
          
                this.state.movies.sort((a,b)=>{
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
            <form onSubmit={this.searchApi}>
              <input type="text" name="search" placeholder="Search" onChange={this.updateValues} />
            </form>
            {this.state.movies &&
              <div>
                <DisplayMovies state = {this.state} />
              </div>
            }
            </div>
        )
    }
}