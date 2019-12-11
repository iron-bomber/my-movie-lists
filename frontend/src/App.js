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
import Create from './components/create-post'
import Friends from './components/friends'
import Feed from './components/feed'


class App extends Component {

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
      <Switch>
        <Route exact path="/" render={(props) => <MyList {...props} user={this.state}/>} />
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state}/>} />
        <Route exact path="/add" render={(props) => <SearchMovies {...props} user={this.state}/>} />
        <Route exact path="/create" render={(props) => <Create {...props}/>} />
        <Route exact path="/my-friends" render={(props) => <Friends {...props}/>} />
        <Route exact path="/my-feed" render={(props) => <Feed {...props}/>} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;
