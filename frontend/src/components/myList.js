import React, { Component } from 'react';
import actions from '../services/index'
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import { loadPartialConfig } from '@babel/core';


class MyList extends Component {

  state = {
    movieList: false,
  }

  async componentDidMount() {
    if (this.props.user.movieList.length > 0){
      this.setState({movieList: true});
    }
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
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  showList = () =>{
    return this.props.user.movieList.map((each, i) => {
      console.log(each);
      let movie = each.movie
      let review = each.review
      let status = each.status
      return (
      <div className="my-list-item">
        <div className="listing-img">
            <img src={movie.img} alt="img" className="poster-size"/>
        </div>
        <div className="my-list-item-header-div">
          <h1 className="my-list-item-header">
              {movie.name} 
          </h1>
        </div>
      </div>
      )
    })
  }

  render() {
  
    return (
    <div>
      <NavLink to="/add">Add a movie</NavLink>
      <button onClick={() => this.props.logOut(this.props.history)} >Log out</button>
      <nav>
        <button>All</button>
        <button>Watching</button>
        <button>Want to watch</button>
      </nav>
        <div>
          {this.state.movieList &&
          <div>
            {this.showList()}
          </div>
          }
          {!this.state.movieList &&
            <div>
              <h2>It looks like you don't currently have a list. Get to work!</h2>
            </div>
          }
        </div>
    </div>
    );
  }
}

export default MyList;