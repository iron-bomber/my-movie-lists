import React, { Component, Fragment } from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import actions from '../services/index'
import NotLoggedIn from './notLoggedIn';
import '../css/listcss.css'
import {Modal, Button} from 'react-bootstrap';


export default class Movie extends Component {

    state = {
        rating: null,
        review: '',
        status: 'completed',
        completed: true
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        this.apiGets()
        this.checkStatus()
    }

    checkStatus = () =>{
        if(this.props.user){
            let ok = this.props.user.movieList.find((each)=>{
                return each.movie.tmdbID == this.props.match.params.id
            })
            if(ok){
                let completed;
                if (ok.review.status == 'completed'){
                    completed = true;
                } else {
                    completed = false;
                }
                this.setState({
                    rating: ok.review.rating,
                    review: ok.review.review,
                    status: ok.review.status,
                    found: true,
                    id: ok.review._id,
                    completed: completed,
                    onList: true
                })
            }
        }
        
    }

    apiGets = () =>{
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&page=1&include_adult=false`)
        .then((res)=>{
            this.setState({
                movie: res.data
            })
            axios.get(`https://image.tmdb.org/t/p/w500${res.data.poster_path}`)
            // axios.get(`https://image.tmdb.org/t/p/w500/ZQixhAZx6fH1VNafFXsqa1B8QI.jpg`)
            .then((res2)=>{
                this.setState({
                    poster: res2.config.url
                })
            })
            .catch((err2)=>{
                console.log(err2)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleChange = e => {
        console.log('74 ', e.target.name, ' - ', e.target.value );
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    reroute = () =>{
        this.props.updateData();
        this.props.history.push('/')
    }

    submitForm = async () =>{
        if(!this.props.user._id){
            this.props.history.push('/log-in');
        }
        let subData = {
            rating: this.state.rating,
            review: this.state.review,
            movie: this.state.movie,
            user: this.props.user._id,
            img: this.state.poster,
            status: this.state.status
        }
        if(this.state.found){
            let updatedReview = {
                review: this.state.review,
                rating: this.state.rating,
                status: this.state.status,
                id: this.state.id
            }
            await actions.updateReview(updatedReview)
            this.props.updateData()
        }else{
            let newMovie = await actions.addMovie(subData);
            this.props.updateData()
        }
    }

    displayGenres = () =>{
        return this.state.movie.genres.map((each, i)=>{
            if(i +1 !== this.state.movie.genres.length){
                return (
                    <span>
                        {each.name}, &nbsp;
                    </span>
                )
            }else{
                return (
                    <span>
                        {each.name}
                    </span>
                )
            }
        })
    }

     Modal() {
      
        const handleClose = () => this.setState({ show: false })
        const submitIt = () => {
            this.submitForm()
            this.setState({ show: false })
        }
        const handleShow = () => this.setState({ show: true })
      
        return (
          <>

            {this.state.onList ? 
            (
                <button className="good-button" variant="primary" onClick={handleShow}>
                    Added
                </button>
            ) :
            (
                <button className="bad-button" variant="primary" onClick={handleShow}>
                    Add to list
                </button>
            )

            }



            {this.state.show &&
                <Modal show={handleShow} onHide={handleClose}>
                <Modal.Body>
                <div>
                <select onChange={this.handleChange} name="status" value={this.state.value}>
                    {this.state.completed &&
                        <Fragment>
                            <option value="completed" selected>Completed</option>
                            <option value="want">Wanna watch</option>
                        </Fragment>
                    }
                    {!this.state.completed &&
                        <Fragment>
                            <option value="completed">Completed</option>
                            <option value="want" selected>Wanna watch</option>
                        </Fragment>
                    }
                </select>
                    <h2>Rate It</h2>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={10}
                        value={this.state.rating}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <div>
                    <h2>What did you think of it?</h2>
                    <br />
                    <textarea className="review-input" name="review" value={this.state.review} onChange={this.handleChange}/>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={submitIt}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                </Modal>

                
            }
          </>
        )
      }
    
    render() {
        console.log(this.state.movie)
        if (this.props.user){
                    return (
            <div>
                {this.state.movie && 
                <div>
                    <h1 className="movie-header">
                        {this.state.movie.original_title} 
                    </h1>
                    <div className="one-movie-result">
                    <div className="listing-img">
                        <img src={this.state.poster} alt="img" className="poster-size"/>
                    </div>
                    <div className="listing-info">
                        <p className="make-inline-flex">
                            <span><b>Avg Rating: &nbsp;</b></span>
                            <span className="gold">★</span> {this.state.movie.vote_average} 
                        </p>

                        <p className="make-inline-flex">
                            <span><b>Runtime: &nbsp;</b></span>
                            {this.state.movie.runtime} mins
                        </p>

                        <p className="make-inline-flex">
                            <span><b>Release Date: &nbsp;</b></span>
                            {this.truncDate(this.state.movie.release_date)}
                        </p>

                        <p className="make-inline-flex">
                            <p><b>Genres: &nbsp;</b></p>
                            <p>
                                {this.displayGenres()}
                            </p>
                        </p>
                    </div>
                </div>
                    <h4 className="synopsis"><b>Synopsis</b></h4>

                        <p className="description">
                            {this.state.movie.overview}
                        </p>
                </div>
                }

                <div>
                    {this.Modal()}
                </div>




                
            </div>
        )
        } else {
            return <NotLoggedIn/>
        }
    }
}