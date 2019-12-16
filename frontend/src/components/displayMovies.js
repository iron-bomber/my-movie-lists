import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import { MdPlaylistAddCheck, MdPlaylistAdd, MdRemoveCircleOutline } from "react-icons/md";

export default class displayItems extends Component {

    state = {
        posters: [],
    }

    truncDate = (a) =>{
        return a.substring(0,4)
    }

    showItems = () =>{
        return this.props.state.results.map((each, i)=>{
            let onMyList = this.props.user[this.props.state.type+"List"].find((item) => {
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
                                    <button className="not-a-button"><MdRemoveCircleOutline/> Remove</button>
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