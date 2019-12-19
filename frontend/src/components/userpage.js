import React, { Component, Fragment } from 'react';
import actions from '../services/index'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import { loadPartialConfig } from '@babel/core';
import StarRatingComponent from 'react-star-rating-component';
import listcss from '../css/listcss.css'
import friend from '../css/friend.css'
import {Link} from 'react-router-dom'
import NotLoggedIn from './notLoggedIn';
import ReadMoreReact from 'read-more-react';



export default class userpage extends Component {

    state = {
        movieList: true,
        ratings: {},
        loading: {},
        one: 'list-nav-google',
        two: 'non-list-nav-google',
        three: 'non-list-nav-google',
      }

    componentDidMount (){
        this.findUser()
    }

    setIt = () =>{
      switch(this.state.selected){
          case 1:
              this.setState({
                  one: 'list-nav-google',
                  two: 'non-list-nav-google',
                  three: 'non-list-nav-google',
                  four: 'non-list-nav-item',
              })
              break;
          case 2:
              this.setState({
                  one: 'non-list-nav-google',
                  two: 'list-nav-google',
                  three: 'non-list-nav-google',
                  four: 'non-list-nav-item',
              })
              break;
          case 3:
              this.setState({
                  one: 'non-list-nav-google',
                  two: 'non-list-nav-google',
                  three: 'list-nav-google',
                  four: 'non-list-nav-item',
              })
              break;
          default:
              break;
      }
    }
    selOne = () =>{
      this.setState({
        selected: 1
      },()=>{this.setIt()})
    }
    selTwo = () =>{
      this.setState({
        selected: 2
      },()=>{this.setIt()})
    }
    selThree = () =>{
      this.setState({
        selected: 3
      },()=>{this.setIt()})
    }

    findUser = async ()=>{
        if(this.props.user){
            let user;
            let found = this.props.user.friends.find(user=>{
                return user._id == this.props.match.params.id
            })
            console.log(found)
            user = await actions.getUser({id:found._id})
            console.log(user)
            this.setState({
                user: user.data
            })
            if (this.state.user && this.state.user.movieList && this.state.user.movieList.length == 0){
                this.setState({movieList: false});
            }
        }
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

      showUser = ()=>{
          let user = this.state.user
          return(
                <p className="user-header">
                  {user.firstName}'s Profile
                </p>      
          )
      }
    
      showList = () =>{
        let list = this.state.user.movieList;
        if(list.length == 0){
            return(
              <div>
                  <h2>This user has no movies in their list. Recommend something!</h2>
              </div>
            )
          }
        switch(this.state.decide){
            case "watching":
              list = list.filter(each=>{
                console.log(each.review.status)
                return each.review.status === "completed"})
              break;
            case "want":
              list = list.filter(each=>{return each.review.status === "want"})
              break;
            default: break;
        }
        return list.map((each, i) => {
          console.log(each);
          let movie = each.movie
          let review = each.review
          let date = new Date(review.updatedAt);
          date = date.toDateString()
          return (
                  <div className="col-6 mt-3">
                    <div className="row feed-item">
                        <div className="col-6">
                        <Link to={`/movie/${movie.tmdbID}`}><h4>{movie.name}</h4></Link>
                            <img className="feed-image-size" src={movie.img} alt="movie poster"/>
                        </div>
                        <div className="col-6">
                            <h4>
                                {date}
                            </h4>
                            <h6>Their rating:</h6>
                            {review.rating &&
                                <Fragment>
                                  <div className="rating-bg">
                                      <StarRatingComponent 
                                          starCount={10}
                                          value={review.rating}
                                          className="list-star"
                                      />
                                  </div>
                                </Fragment>
                            }
                            {!review.rating &&
                              <div>
                                N/A
                              </div>
                            }
                            <h6>Their review:</h6>
                            {review.review &&
                                <Fragment>
                                    
                                    <div>
                                        <p>
                                            {review.review}
                                        </p>
                                    </div>
                                </Fragment> 
                            }
                            {!review.review &&
                              <div>
                                N/A
                              </div>
                            }
                        </div>
                    </div>
                </div>
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
        if (this.state.user){
              return (
        <div>
        <div>
            {this.showUser()}
        </div>

        <nav className="align-center container">
          <button onClick={(e)=>{this.decideShowing(e); this.selOne()}} className={this.state.one} name="all">All</button>
          <button onClick={(e)=>{this.decideShowing(e); this.selTwo()}}  className={this.state.two} name="watching">Watched</button>
          <button onClick={(e)=>{this.decideShowing(e); this.selThree()}}  className={this.state.three} name="want">Want to watch</button>
      </nav>
            <div className="container-fluid">
              <div className="row">
                {this.showList()}
              </div>   
            </div>
        </div>
        );
        }return(
            <div>

            </div>
        )
    
      }
}
