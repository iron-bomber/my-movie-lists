import React, {Component, Fragment} from 'react';
// import {NavLink} from 'react-router-dom'
import NotLoggedIn from '../notLoggedIn';
import {FiEdit3} from "react-icons/fi";
import classNames from 'classnames';


class Profile extends Component {


    state = {
        changeName: false,
        changeEmail: false,
        changePassword: false,
    }

    componentDidMount(){
        if (this.props.user){
            this.setState({
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                email: this.props.user.email,
                password: '',
            })
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
    
    handleChange = async e => {
        await this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.changeEmail){
            this.isValidEmail();
        }
    }

    changeMy = (field) => {
        switch (field){
            case 'name':
                this.setState({
                    changeName: true,
                    changeEmail: false,
                    changePassword: false,
                })
                break;
            case 'email':
                this.setState({
                    changeName: false,
                    changeEmail: true,
                    changePassword: false,
                })
                break;
            case 'password':
                this.setState({
                    changeName: false,
                    changeEmail: false,
                    changePassword: true,
                })
                break;
        }
    }



    
    render(){
        if (this.props.user){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <button className="btn btn-danger" onClick={() => this.props.logOut(this.props.history)}>Log out</button>
                    </div>
                    <div className="col-12 mb-2 text-left">
                        {!this.state.changeName &&
                            <div>
                                <h3>Your name: {this.props.user.firstName} {this.props.user.lastName}</h3>
                                <button onClick={() => {this.changeMy("name")}}><FiEdit3/> Edit</button>
                            </div>
                        }
                        {this.state.changeName &&
                            <Fragment>
                                <div>
                                    <input type="text" name="firstName" value={this.state.firstName} className={this.isValid('firstName').class} onChange={this.handleChange} placeholder="First Name"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Field cannot be empty
                                    </div>
                                </div>
                                <div>
                                    <input type="text" name="lastName" value={this.state.lastName} className={this.isValid('lastName').class} onChange={this.handleChange} placeholder="Last Name"/>
                                    <div className="valid-feedback text-left">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback text-left">
                                        Field cannot be empty
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={this.submitChanges}>Save</button>
                            </Fragment>
                        }
                        <div>
                            Your email: {this.props.user.email}
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