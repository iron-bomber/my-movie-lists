import React, {Component, Fragment} from 'react';
// import {NavLink} from 'react-router-dom'
import NotLoggedIn from '../notLoggedIn';
import {FiEdit3} from "react-icons/fi";
import classNames from 'classnames';
import actions from '../../services/index';


class Profile extends Component {


    state = {
        change: {
            name: false,
            email: false,
            password: false
        }
    }

    componentDidMount(){
        if (this.props.user){
            this.mountDataInState();
        }
    }

    mountDataInState = () => {
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            password: '',
        })
    }

    change = input => {
        this.mountDataInState();
        let change = {name: false, email: false, password: false};
        switch (input){
            case 'name':
                change.name = true;
                break;
            case 'email': 
                change.email = true;
                break;
            case 'password':
                change.password = true;
                break;
            default: 
                break;
        }
        this.setState({
            change: change
        })
        this.isValidEmail();
    }

    cancel = () => {
        this.mountDataInState();
        let change = {name: false, email: false, password: false};
        this.setState({
            change: change
        })
    }

    handleChange = async e => {
        await this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.change.email){
            this.isValidEmail();
        }
    }

    validator = input => {
        switch (input){
            case 'firstName':
            case 'lastName':
                if (this.state[input].length < 1) {
                    let message = 'Field cannot be empty';
                    return {valid: false, message: message};
                } else {
                    return {valid: true}
                }
            case 'password':
            case 'confirmPassword':
                if (this.state.password.length < 6) {
                    let message = 'Password must be at least 6 characters long.';
                    return {valid: false, message: message};
                } else if (this.state.password !== this.state.confirmPassword){
                    let message = 'Password do not match.';
                    return {valid: false, message: message};
                } else {
                    return {valid: true}
                }
            default:
                break;
        }
    }

    isValid = input => {
        let wert = {}
        let valid = this.validator(input);
        if (valid.message){
            wert.message = valid.message;
            wert.class = classNames('form-control', 'input-lg', 'is-invalid');
        } else {
            wert.message = "";
            wert.class = classNames('form-control', 'input-lg', 'is-valid' );
        } return wert;
    }

    isValidEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){ 
            actions.validEmail(this.state.email)
            .then((validEmail) => {
                console.log(validEmail.data);
                if (validEmail.data.free){
                    let theClass = classNames('form-control', 'input-lg', 'is-valid');
                    this.setState({
                        emailClass: theClass,
                        emailMessage: ""
                    })
                } else {
                    if (this.props.user.email == this.state.email){
                        let message = 'You said you wanted to change it!';
                        let theClass = classNames('form-control', 'input-lg', 'is-invalid');
                        this.setState({
                            emailClass: theClass,
                            emailMessage: message
                        })
                    } else {
                        let message = 'That email is already in use, please choose another.';
                        let theClass = classNames('form-control', 'input-lg', 'is-invalid');
                        this.setState({
                            emailClass: theClass,
                            emailMessage: message
                        })
                    }
                }
            })
        } else {
            let message = 'Invalid email address.';
            let theClass = classNames('form-control', 'input-lg', 'is-invalid');
            this.setState({
                emailClass: theClass,
                emailMessage: message
            })
        }
    }

    submitChanges = async (input) => {
        let valid = false;
        if (input == 'name'){
            valid = this.validator('firstName').valid && this.validator('lastName').valid;
        } else if (input == 'email'){
            this.isValidEmail();
            if (this.state.emailMessage.length == 0){
                valid = true;
            }
        }
        if (valid){
            let data = {};
            switch (input){
                case 'name':
                    data.firstName = this.state.firstName;
                    data.lastName = this.state.lastName;
                    break;
                case 'email': 
                    data.email = this.state.email;
                    break;
                case 'password':
                    data.password = this.state.password;
                    break;
                default:
                    break;
            }
            await actions.updateProfile(data);
            this.props.updateData();
            this.cancel();
        }
    }
    
    
    render(){
        if (this.props.user){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                    <button className="btn btn-secondary" onClick={this.props.logOut}>Log out</button>
                        <h2>Account settings</h2>
                        <button onClick={this.props.logOut}>Log Out</button>
                    </div>
                    <div className="col-8 change-name">
                        <div className="row text-left">
                        <div className="col-2">
                            <b>Name</b>
                        </div>
                        {!this.state.change.name &&
                            <Fragment>
                                <div className="col-8 text-secondary">
                                    {this.props.user.firstName} {this.props.user.lastName}
                                </div>
                                <div className="col-2">
                                    <button onClick={() => {this.change('name')}} className="not-a-button">Edit</button>
                                </div>
                            </Fragment>

                        }
                        {this.state.change.name &&
                            <Fragment>
                                <div className="col-4">
                                    <input type="text" name="firstName" value={this.state.firstName} className={this.isValid('firstName').class} onChange={this.handleChange} placeholder="First Name"/>
                                    <div className="valid-feedback text-left">
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Field cannot be empty
                                    </div>
                                </div>
                                <div className="col-4">
                                    <input type="text" name="lastName" value={this.state.lastName} className={this.isValid('lastName').class} onChange={this.handleChange} placeholder="Last Name"/>
                                    <div className="valid-feedback text-left">
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Field cannot be empty
                                    </div>
                                </div>
                                <div className="col-2">
                                    <button onClick={() => {this.submitChanges('name')}} className="badge badge-primary">Save</button>
                                    <button onClick={this.cancel} className="badge badge-danger">Cancel</button>
                                </div>
                            </Fragment>
                        }
                        </div>
                    </div>
                    <div className="col-8 change-email">
                        <div className="row text-left">
                        <div className="col-2">
                            <b>Email</b>
                        </div>
                        {!this.state.change.email &&
                            <Fragment>
                                <div className="col-8 text-secondary">
                                    {this.props.user.email}
                                </div>
                                <div className="col-2">
                                    <button onClick={() => {this.change('email')}} className="not-a-button">Edit</button>
                                </div>
                            </Fragment>

                        }
                        {this.state.change.email &&
                            <Fragment>
                                <div className="col-8">
                                    <input type="email" name="email" value={this.state.email} className={this.state.emailClass} onChange={this.handleChange} placeholder="Your Email"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        {this.state.emailMessage}
                                    </div>
                                </div>
                                <div className="col-2">
                                    <button onClick={() => {this.submitChanges('email')}} className="badge badge-primary">Save</button>
                                    <button onClick={this.cancel} className="badge badge-danger">Cancel</button>
                                </div>
                                <div className="col-12 text-center">
                                    <i>You will be logged out if you change this</i>
                                </div>
                            </Fragment>
                        }
                        </div>
                    </div>
                </div>
            </div>
        ); 
        } else {
            return <NotLoggedIn/>
        }

    }
}

export default Profile;