import React, {Component, Fragment} from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components'
import MyList from './components/myList';
import NotFound from './components/404/NotFound.js';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Profile from './components/profile/Profile'
import actions from './services/index'
import SearchMovies from './components/searchMovies'
import Movie from './components/create-post'
import Friends from './components/friends'
import Feed from './components/feed'
import Axios from 'axios';


class App extends Component {
  state = { }
  
  async componentDidMount() {
    let user = await actions.isLoggedIn()
    this.setState({...user.data})
  }

  setUser = (user) => this.setState(user)
  
  logOut = async () => {
    let res = await actions.logOut()
    this.setUser({email:null, createdAt: null, updatedAt: null, _id: null }) //FIX 
  }

  testButton = async () => {
    console.log('33 ', this.state._id);
    let theMovies = await actions.getMovies({theId: this.state._id});
    console.log(theMovies);
  }

  render(){
    return (
      
    <BrowserRouter>
      <nav className="ourbar">
        <NavLink to="/" className="navbar-item">
        <img src={require("./images/list.png")} className="navbar-icons"/>
        </NavLink>
      
        <NavLink to="/my-feed" className="navbar-item">
          <img src={require("./images/social.png")} className="navbar-icons"/>
        </NavLink>

        <NavLink to="/my-friends" className="navbar-item">
          <img src={require("./images/user.png")} className="navbar-icons"/>
        </NavLink>

        <NavLink to ="/profile" className="navbar-item">
            <img src={require("./images/cog.png")} className="navbar-icons"/>
        </NavLink>
      </nav>
      <button onClick={this.testButton}>movie list</button>
      <Switch>
        <Route exact path="/" render={(props) => <MyList {...props} user={this.state}/>} />
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state}/>} />
        <Route exact path="/add" render={(props) => <SearchMovies {...props} user={this.state}/>} />
        <Route exact path="/movies/:id" render={(props) => <Movie {...props} user={this.state}/>} />
        <Route exact path="/my-friends" render={(props) => <Friends {...props}/>} />
        <Route exact path="/my-feed" render={(props) => <Feed {...props}/>} />

        <Route component={NotFound} />

      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;