import React, { Component, Fragment } from 'react';
import actions from '../../services/index'

class LogIn extends Component {

    state = {
        incorrect: false
    } 

    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = e => {
        e.preventDefault()
        actions.logIn(this.state)
        .then((res)=>{
            this.props.setUser({...res.data})
            this.props.history.push("/")})
        .catch((err)=>{
            console.log(err)
            this.incorrect()});
    }

    incorrect = () =>{
        this.setState({
            incorrect: true
        })
        setTimeout(() => {
            this.setState({incorrect: false})
        }, 3000);
    }

    render() {
        return (
            <Fragment>
                <h2>LogIn</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" type="email" onChange={this.handleChange} />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <input type="submit" value="Log In"/>
                </form>
                {this.state.incorrect &&
                <p>
                    Username or password incorrect, please try again.
                </p>
                }
            </Fragment>
        );
    }
}

export default LogIn;