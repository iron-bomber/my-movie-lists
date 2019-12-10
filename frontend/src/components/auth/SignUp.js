import React, { Component, Fragment } from 'react';
import actions from '../../services/index'
import classNames from 'classnames';

class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    } 
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    } 

    formDefaults = {
        firstName: {value: '', isValid: true, message: ''},
        lastName: {value: '', isValid: true, message: ''},
        email: { value: '', isValid: true, message: '' },
        password: { value:'', isValid: true, message: '' },
        confirmPassword: { value: '', isValid: true, message: '' }
    }

    isValid = input => {
        let valid = '';
        switch (input){
            case 'firstName':
                if (this.state.firstName.length < 1) {
                    valid = "is-invalid";
                } else {
                    valid = "is-valid"
                }
                break;
        }
        console.log(classNames('form-control', 'input-lg', valid ));
        return classNames('form-control', 'input-lg', valid ); // => 'foo bar'
    }

    handleSubmit = async e => {
        e.preventDefault()
        let user = await actions.signUp(this.state);
        this.props.setUser({...user.data})  
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container" id="wrap">
                <div className="row">
                    <div className="col-6 offset-3">
                        <form accept-charset="utf-8" className="form" role="form" onSubmit={this.handleSubmit}>   <legend>Sign Up</legend>
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <input type="text" name="firstName" value={this.state.firstName} className={this.isValid('firstName')} onChange={this.handleChange} placeholder="First Name"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Please enter a first name
                                    </div>
                                </div>
                                <div className="col-6 mb-2">
                                    <input type="text" name="lastName" value={this.state.lastName} className="form-control input-lg" placeholder="Last Name"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Please enter a last name
                                    </div>
                                </div>
                            </div>
                            <input type="email" name="email" value="" className="form-control input-lg mb-2" placeholder="Your Email"/>
                            <input type="password" name="password" value="" className="form-control input-lg mb-2" placeholder="Password"/>
                            <input type="password" name="confirmPassword" value="" className="form-control input-lg mb-2" placeholder="Confirm Password"/>
                            <br />
                            <button className="btn btn-lg btn-primary btn-block signup-btn" type="submit">
                                Create my account
                            </button>
                        </form>          
                    </div>
                </div>          
            </div>
        );
    }
}

export default SignUp;