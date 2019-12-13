import React, {Component, Fragment} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled, { css } from 'styled-components'
import Home from './components/home';
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
import Navbar from './components/navbar';


class App extends Component {
  state = { 
    user: null
  }
  
  async componentDidMount() {
    let user = await actions.isLoggedIn()
    this.setState({
      user: user.data
    })
  }

  setUser = (user) => {
    this.setState({
      user: user
    })
  }
  
  logOut = async (history) => {
    let res = await actions.logOut()
    this.setUser(null);
    history.push('/');
  }

  testButton = async () => {
    console.log('33 ', this.state._id);
    let theMovies = await actions.getMovies({theId: this.state._id});
    console.log(theMovies);
  }

  render(){
    console.log('app.js 48 ', this.state.user)
    return (
      
    <BrowserRouter>
      <Navbar/>
      <button className="btn btn-success" onClick={this.testButton}>movie list</button>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} user={this.state.user} logOut={this.logOut} /> } />
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.user}/>} />
        <Route exact path="/add" render={(props) => <SearchMovies {...props} user={this.state.user}/>} />
        <Route exact path="/movies/:id" render={(props) => <Movie {...props} user={this.state.user}/>} />
        <Route exact path="/my-friends" render={(props) => <Friends {...props}/>} />
        <Route exact path="/my-feed" render={(props) => <Feed {...props}/>} />

        <Route component={NotFound} />

      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;