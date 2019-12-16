import React, { Component } from 'react';
import actions from '../services/index'
import axios from 'axios';
import {NavLink} from 'react-router-dom'


class MyList extends Component {

  state = {

  }

  async componentDidMount() {
    
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
    // return this.props.list.map((each, i)=>{
    //   let movie = each.movie
    //   let review = each.review
    //   let status = each.status
    //   return (
    //   <div className="my-list-item">
    //     <div className="listing-img">
    //         <img src={movie.img} alt="img" className="poster-size"/>
    //     </div>
    //     <div className="my-list-item-header-div">
    //       <h1 className="my-list-item-header">
    //           {movie.original_title} 
    //       </h1>
    //     </div>
    //   </div>
    //   )
    // })
  }

  render() {
    return (
      
      <div>
      <nav>
        <button>All</button>
        <button>Watching</button>
        <button>Want to watch</button>
        <NavLink to="/add">Add</NavLink>
        <NavLink to="/log-in">login</NavLink>
        <NavLink to="/sign-up">signup</NavLink>
      </nav>
      <div>
        {this.showList()}
      </div>
      </div>
    );
  }
}

export default MyList;