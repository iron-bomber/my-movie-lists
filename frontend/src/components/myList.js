import React, { Component } from 'react';
import actions from '../services/index'
import axios from 'axios';
import {NavLink} from 'react-router-dom'


class MyList extends Component {

  state = {

  }

  async componentDidMount() {
    //actions.test()
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

  render() {
    return (
      
      <div>
      <nav>
        <button>All</button>
        <button>Watching</button>
        <button>Want to watch</button>
        <NavLink to="/add">Add</NavLink>
      </nav>
      </div>
    );
  }
}

export default MyList;