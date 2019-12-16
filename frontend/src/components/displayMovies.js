import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import { MdPlaylistAddCheck, MdPlaylistAdd, MdRemoveCircleOutline } from "react-icons/md";
import actions from '../services';

export default class displayItems extends Component {

    state = {
        posters: [],
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    removeItem = async (itemId, list) => {
        if (list == 'showList'){
            await actions.removeShow(itemId);
        } else {
            await actions.removeMovie(itemId);
        }
        await this.props.updateData();
        this.props.history.push('/')
    }

    showItems = () =>{
        if (this.props.user){
            return this.props.state.results.map((each, i)=>{
                console.log(this.props.user);
                let list = "";
                if (this.props.state.type == 'tv'){
                    list = "showList";
                } else {
                    list = "movieList";
                }
                let onMyList = this.props.user[list].find((item) => {
                    if (item.movie.tmdbID == each.id){
                        return true;
                    } else {
                        return false;
                    }
                })
                return (
                    <div className="one-movie-result">
                    <div className="listing-img">
                        {this.props.state[each.id] &&
                        <div>
                            <img src={this.props.state[each.id]} alt="img" className="poster-size"/>
                            {onMyList &&
                                <div className="listing-add-btn text-left">
                                    <div><MdPlaylistAddCheck/> On my list</div>
                                    <div>
                                        <Link to={{
                                            pathname: `/${this.props.state.type}/${each.id}`,
                                            edit: true
                                            }} >
                                            <FaEdit/> Edit
                                        </Link>
                                    </div>
                                    <div>
                                        <button className="not-a-button" onClick={() => {this.removeItem(each.id, list)}}><MdRemoveCircleOutline/> Remove</button>
                                    </div>
                                </div>
                                
                            }
                            {!onMyList &&
                                <Link to={{
                                    pathname: `/${this.props.state.type}/${each.id}`,
                                    edit: false
                                    }} className="listing-add-btn text-left">
                                        <MdPlaylistAdd/> Add
                                </Link>
                            }
                        </div>
                        }
                    </div>
                    <div className="listing-info">
                        <h3>
                            {each.name &&
                                each.name
                            }
                            {!each.name &&
                                each.original_title
                            }
                        </h3>
                        <h4>
                        {each.first_air_date &&
                            <div>
                                {this.truncDate(each.first_air_date)}
                            </div>    
                        }
                        {each.release_date &&
                            <div>
                                {this.truncDate(each.release_date)}
                            </div>
                        }
                        </h4>
                        <p className="description">
                            {each.overview}
                        </p>
                    </div>
                    </div>
                        
                )
            })
        } else {
            this.props.history.push('/log-in');
        }
    }

    render() {
        console.log('rerendering', this.props)
        return (
            <div>
                {this.showItems()}
            </div>
        )
    }
}