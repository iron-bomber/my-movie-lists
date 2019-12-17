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
           if(each.received){
               console.log(each)
               return (
                   <div>
                    {each.user.email}
                    <button onClick={this.acceptReq} name={each.user._id}>Accept :)</button>
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
        let done = await actions.acceptReq(data)
        console.log(done)
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
        let update = await this.props.updateData()
        console.log(res, update)
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
                return (
                    <div>
                        {each.email}
                        {each.firstName}
                        {each.lastName}
                        {!exists &&
                            <button name={each._id} onClick={this.sendReq}>
                                Add
                            </button>
                        }
                        {exists &&
                            <p>
                                Request pending...
                            </p>
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
