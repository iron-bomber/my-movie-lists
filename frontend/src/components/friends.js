import React, { Component } from 'react';
import actions from '../services';
import NotLoggedIn from './notLoggedIn';


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
                    {each.name}
                </div>
            )
        })
    }

    showRequests = () =>{
       return this.props.user.requests.map(each=>{
           console.log(each, this.props.user)
           return (
               <div>
               {each.firstName}
               </div>
           )
       })
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
        let res = await actions.sendReq(data)
        console.log(res)
    }

    showUsers = () =>{
        if(this.state.users.length > 0){
            return this.state.users.map(each=>{
                return (
                    <div>
                        {each.email}
                        {each.firstName}
                        {each.lastName}
                        <button name={each._id} onClick={this.sendReq}>
                            Add
                        </button>
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

            <button onClick={this.toggleRequests}>Requests</button>

            <button onClick={this.toggleFriend}>
                Friends
            </button>
            <button onClick={this.toggleFind}>
                Add Friends
            </button>



            {this.state.requestsOn &&
                <div>
                Reqs
                    {this.showRequests()}
                </div>
            }
            {this.state.friendOn &&
                <div>
                    <form className="form-inline" onSubmit={this.searchFriends}>
                        <input type="text" className="form-control" name="searchfriends" placeholder="Search friends" autoComplete="off" onChange={this.updateValues} />
                    </form>
                </div>
            }
            {this.state.findOn &&
                <div>
                    <form className="form-inline" onSubmit={this.searchFriends}>
                        <input type="text" className="form-control" name="search" placeholder="Search user by email" autoComplete="off" onChange={this.updateValues} />
                    </form>
                    {this.showUsers()}
                    {this.showFriends()}
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
