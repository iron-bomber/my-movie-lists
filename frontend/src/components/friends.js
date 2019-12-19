import React, { Component } from 'react';
import actions from '../services';
import NotLoggedIn from './notLoggedIn';
import {Link} from 'react-router-dom'
import '../css/listcss.css'


export default class friends extends Component {

    state = {
        users: [],
        friendOn: true,
        requestsOn: false,
        findOn: false
    }

    showFriends = () =>{
        return this.props.user.friends.map(each=>{
            return (
                <div>
                    <Link to={'/userpage/' + each._id}>
                        {each.firstName} // {each.email}
                    </Link>
                    {this.state[each._id] && this.state[each._id].removed ?
                    (
                        <button name={each._id} className="removed">Removed</button>
                    )
                    : (
                        <button name={each._id} onClick={this.removeFriend}>Remove friend</button>
                    )

                    }
                    
                </div>
            )
        })
    }

    removeFriend = async (e) =>{
        e.preventDefault()
        let ids = {
            theirId: e.target.name,
            myId: this.props.user._id
        }
        this.setState({
            [e.target.name]: {
                removed: true
            }
        })
        await actions.removeFriend(ids)
        this.props.updateData()
    }

    showRequests = () =>{
        if(this.props.user.requests.filter(each=>{
            return each.received
        }).length == 0
        ){
            return (
                <div className="no-reqs">
                    No requests
                </div>
            )
        }
       return this.props.user.requests.map(each=>{
           if(each.received){
               return (
                   <div>
                    {each.user.email}
                    {this.state[each.user._id] && this.state[each.user._id].added ?
                    (
                        <button name={each.user._id} className="removed">Accepted!</button>
                    )
                    : 
                    (
                        <button onClick={this.acceptReq} name={each.user._id}>Accept :)</button>
                    )
                    }
                   </div>
               )
           }else return
       })
    }

    acceptReq = async (e) =>{
        e.preventDefault()
        let data = {
            theirId: e.target.name,
            myId: this.props.user._id
        }
        await this.setState({
            [e.target.name]: {
                added: true
            }
        })
        console.log(this.state)
        await actions.acceptReq(data)
        this.props.updateData()
    }

    updateValues = (e) =>{
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    searchFriends = async (e) =>{
        e.preventDefault()
        let email = this.state.search
        let users = await actions.findUsers(email)
        this.setState({
            users: users.data
        })
    }

    sendReq = async (e) =>{
        e.preventDefault()
        let data = {
            myId: this.props.user._id,
            theirId: e.target.name
        }
        this.setState({
            [e.target.name]: {
                sent: true
            }
        })
        let res = await actions.sendReq(data)
        console.log(res)
        await this.props.updateData()
    }

    showUsers = () =>{
        if(this.state.users.length > 0){
            return this.state.users.map(each=>{
                let exists = this.props.user.requests.find(each2=>{
                    console.log(each._id, each2.user._id)
                    return each._id == each2.user._id
                })
                if(this.props.user._id == each._id){
                    return
                }
                console.log(this.state[each._id])
                return (
                    <div>
                        {each.email}
                        {each.firstName}
                        {each.lastName}
                        {(this.state[each._id] && this.state[each._id].sent) || exists ? 
                        (
                            <p>
                                Request pending...
                            </p>
                        ) 
                        :
                        (
                            <button name={each._id} onClick={this.sendReq}>
                                Add
                            </button>
                        )
                        }
                    </div>
                )
            })
        }
    }

    toggleFriend = ()=> {
        this.setState({
            requestsOn: false,
            findOn: false,
            friendOn: true
        })
    }

    toggleFind = ()=> {
        this.setState({
            requestsOn: false,
            findOn: true,
            friendOn: false
        })
    }

    toggleRequests = () =>{
        this.setState({
            requestsOn: true,
            findOn: false,
            friendOn: false
        })
    }


    render() {
        if (this.props.user){
                    return (
            <div>

            <div className="align-center">
                        <nav className="list-nav">

                                    <button onClick={this.toggleRequests} className="list-nav-item">Requests</button>

                                    <button onClick={this.toggleFriend} className="list-nav-item">
                                        Friends
                                    </button>
                                    <button onClick={this.toggleFind} className="list-nav-item">
                                        Add Friends
                                    </button>
                        </nav>
            </div>



            {this.state.requestsOn &&
                <div>
                    {this.showRequests()}
                </div>
            }
            {this.state.friendOn &&
                <div>
                    <form className="form-inline" onSubmit={this.searchFriends} className="align-center">
                        <input type="text" className="form-control friend-search" name="searchfriends" placeholder="Search friends" autoComplete="off" onChange={this.updateValues} />
                    </form>
                    {this.showFriends()}
                </div>
            }
            {this.state.findOn &&
                <div>
                    <form className="form-inline" onSubmit={this.searchFriends} className="align-center">
                        <input type="text" className="form-control friend-search" name="search" placeholder="Search user by email or name" autoComplete="off" onChange={this.updateValues} />
                    </form>
                    {this.showUsers()}
                </div>
            }
            </div>
        )
        } else {
            return (
            <NotLoggedIn/>
            )
        }

    }
}
