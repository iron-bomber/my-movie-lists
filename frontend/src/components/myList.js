import React, { Component } from 'react';
import actions from '../services/index'
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import { loadPartialConfig } from '@babel/core';
import StarRatingComponent from 'react-star-rating-component';


class MyList extends Component {

  state = {
    movieList: false,
    ratings: {},
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

  openStarRater = (i) => {
    let ratings = {};
    ratings[i] = true;
    this.setState({ratings: ratings, rating: null});
  }

  updateRating = async (reviewId, i) => {
    if (this.state.rating){
      let updatedReview = {
        id: reviewId,
        rating: this.state.rating,
      }
      await actions.updateRating(updatedReview);
      this.setState({
        ratings: {}
      }, () => {
        this.props.updateData();
      })
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  showList = () =>{
    return this.props.user.movieList.map((each, i) => {
      console.log(each);
      let movie = each.movie
      let review = each.review
      let status = each.status
      return (
      // <div className="my-list-item">
      //   <div className="listing-img">
      //       <img src={movie.img} alt="img" className="poster-size"/>
      //   </div>
      //   <div className="my-list-item-header-div">
      //     <h1 className="my-list-item-header">
      //         {movie.name} 
      //     </h1>
      //   </div>
      // </div>
      <div className="col-12 movie-list-item">
        <div className="row">
          <div className="col-2 offset-4 offset-md-0">
            <img src={movie.img} alt="img" className="poster-size"/>
          </div>
          <div className="col-4 text-left">
            <h2>{movie.name}</h2>
            {review.rating &&
              <h4>Your rating: {review.rating}/10</h4>
            }
            {!review.rating && !this.state.ratings[review._id] &&
              <div>
                <h6>You haven't rated this yet.</h6>
                <button onClick={() => {this.openStarRater(review._id, i)}}>Rate it!</button>
              </div>
            }
            {this.state.ratings[review._id] &&
              <div>
                  <StarRatingComponent 
                          name={'rate'+i}
                          starCount={10}
                          value={this.state.rating}
                          onStarClick={this.onStarClick.bind(this)}
                  />
                  <button onClick={() => {this.updateRating(review._id)}}>Rate it</button>
              </div>
            }
          </div>       
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
        <div className="container-fluid">
          {this.state.movieList &&
          <div className="row">
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