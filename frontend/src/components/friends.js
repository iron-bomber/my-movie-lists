import React, { Component } from 'react'
import actions from '../services'
import NotLoggedIn from './notLoggedIn';

export default class friends extends Component {

    state = {
        users: [],
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

    updateValues = (e) =>{
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    searchFriends = async (e) =>{
        e.preventDefault()
        let email = this.state.search
        let users = await actions.findUsers(email);
        console.log(users.data)
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


    render() {
        if (this.props.user){
            return (
                <div>
                    Friends
                    <form className="form-inline" onSubmit={this.searchFriends}>
                        <input type="text" className="form-control" name="search" placeholder="Search for a user" autocomplete="off" onChange={this.updateValues} />
                    </form>
                    {this.showUsers()}
                    {this.showFriends()}
                </div>
            )
        } else {
            return <NotLoggedIn/>
        }
    }
}
