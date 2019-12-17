import React, { Component } from 'react';
import actions from '../services/index'
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import { loadPartialConfig } from '@babel/core';
import StarRatingComponent from 'react-star-rating-component';
import listcss from '../css/listcss.css'
import {Link} from 'react-router-dom'
import NotLoggedIn from './notLoggedIn';


class MyList extends Component {

  state = {
    movieList: false,
    ratings: {},
    loading: {},
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
      let loading = {};
      loading[i] = true;
      await this.setState({loading: loading});
      let updatedReview = {
        id: reviewId,
        rating: this.state.rating,
      }
      await actions.updateRating(updatedReview);
      await this.props.updateData();
      await this.setState({
        ratings: {},
        loading: {},
      }) 
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  showList = () =>{
    let list = this.props.user.movieList;
    switch(this.state.decide){
      case "watching":
        list.filter(each=>{return each.status === "watching"})
        break;
      case "want":
        list.filter(each=>{return each.status === "want-to-watch"})
        break;
      default: break;

    }
    return list.map((each, i) => {
      console.log(each);
      let movie = each.movie
      let review = each.review
      let status = each.status
      var sectionStyle = {
        // height: "300px",
        // width: "auto",
        backgroundImage: `url('${movie.img}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
      return (
      <Link to={"/movie/"+ movie.tmdbID}className="singlebubble" style={sectionStyle}>
      <div className="bubble-bg">

      </div>
          <div className="bubble-info">
            <p className="bubble-header">{movie.name}</p>
            {review.rating &&
              <p className="bubble-rating">
              <StarRatingComponent 
                          starCount={1}
                          value={1}
                          onStarClick={this.onStarClick.bind(this)}
                          className="list-star"
                  />
              {review.rating} 
              </p>
            }
            {!review.rating && !this.state.ratings[review._id] && !this.state.loading[review._id] &&
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
        </Link>
      )
    })
  }

  decideShowing = (e)=>{

    switch(e.target.name){
      case "watching":
        this.setState({
          decide: 'watching'
        })
        break;
      case "want":
        this.setState({
          decide: 'want'
        })
        break;
      case "all":
        this.setState({
          decide: 'all'
        })
        break;
      default:
        break;
    }
    console.log(this.state)

  }

  render() {
    if (this.props.user){
          return (
    <div>
      <NavLink to="/add">Add a movie</NavLink>
      <nav>
        <button onClick={this.decideShowing} name="all">All</button>
        <button onClick={this.decideShowing} name="watching">Watching</button>
        <button onClick={this.decideShowing} name="want">Want to watch</button>
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
    } else {
      return <NotLoggedIn/>
    }

  }
}

export default MyList;