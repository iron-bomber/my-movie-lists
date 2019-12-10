import React, { Component, Fragment } from 'react';
import actions from '../../services/index'

class SignUp extends Component {
    state = {

    } 
    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = async e => {
        e.preventDefault()
        let user = await actions.signUp(this.state);
        this.props.setUser({...user.data})  
        this.props.history.push('/')
    }

    render() {
        return (
            <Fragment>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    Name: <input name="name" type="text" onChange={this.handleChange} />
                    Email: <input name="email" type="email" onChange={this.handleChange} />
                    Password: <input name="password" type="password" onChange={this.handleChange} />
                    <input type="submit" value="Sign Up"/>
                </form>
            </Fragment>
        );
    }
}

export default SignUp;