import React, { Component } from 'react'
import axios from 'axios'
import StarRatingComponent from 'react-star-rating-component';
import actions from '../services/index';


export default class Show extends Component {

    state = {
        rating: null,
        review: '',
        status: 'watching',
        epsSeen: null,
        watching: false,
        season: "1",
        episode: "1",
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=4e7508386ba64e46c3202cad3c021203&language=en-US&page=1&include_adult=false`)
        .then((res)=>{
            this.setState({
                show: res.data,
                watching: true
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
        let watching = true;
        if (e.target.name === 'status' && e.target.value !== 'watching'){
            watching = false;
        } else if (e.target.name === 'season') {
            this.setState({
                episode: "1"
            })
        }
        this.setState({
            [e.target.name]: e.target.value,
            watching: watching
        })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    reroute = () =>{
        this.props.history.push('/')
    }

    submitForm = (e) =>{
        e.preventDefault()
        if(!this.props.user._id){
            this.props.history.push('/')
        }
        let subData = {
            rating: this.state.rating,
            review: this.state.review,
            show: this.state.show,
            user: this.props.user._id,
            img: this.state.poster,
            status: this.state.status,
            season: this.state.season,
            episode: this.state.episode
        }
        actions.addShow(subData);
        this.props.updateData();
        this.reroute();
    }

    displaySeasons = () => {
        let seasons = this.state.show.seasons.filter((season) => {
            if (season.season_number < 1) {
                return false;
            } else {
                return true;
            }
        })
        .sort((a, b) => {
            if (a.season_number > b.season_number){
                return 1;
            } else if (a.season_number < b.season_number){
                return -1;
            } else {
                return 0;
            }
        })
        .map((season) => {
            return(
            <option value={season.season_number}>
                Season {season.season_number}
            </option>
            )
        })
        return seasons
    }
    displayEpisodes = () => {
        let season = this.state.show.seasons.find( season => season.season_number == this.state.season)
        let episodes = [];
        for (let i = 1; i <= season.episode_count; i++){
            if(i == this.state.episode){
                episodes.push(
                    <option value={i} selected={true}>
                        Episode {i}
                    </option>
                )
            } else{

                episodes.push(
                    <option value={i}>
                    Episode {i}
                </option>
            )
        }
        }
        return episodes;
    }
    
    render() {
        return (
            <div>
                {this.state.show && 
                    <div className="one-movie-result">
                    <div className="listing-img">
                        <img src={this.state.poster} alt="img" className="poster-size"/>
                    </div>
                    <div className="listing info">
                        <h1>
                            {this.state.show.name} 
                        </h1>
                        <h3>
                            {this.truncDate(this.state.show.first_air_date)}
                        </h3>
                        <p className="description">
                            {this.state.show.overview}
                        </p>
                    </div>
                </div>
                }
                <div>
                    <select onChange={this.handleChange} name="status">
                        <option value="watching">Currently watching</option>
                        <option value="completed">Completed</option>
                        <option value="want-to-watch">Wanna watch</option> 
                    </select>
                    {this.state.watching &&
                        <div>
                            <h4>Season</h4>
                            <select onChange={this.handleChange} name="season">
                                {this.displaySeasons()}
                            </select>
                            <select onChange={this.handleChange} name="episode">
                                {this.displayEpisodes()}
                            </select>
                        </div>
                    }
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
                    <textarea className="review-input" name="review" onChange={this.handleChange}/>
                </div>
                <div>
                    <button className="submit-rating" onClick={this.submitForm}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}