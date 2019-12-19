import React, {Component, Fragment} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components'
import Home from './components/home';
import NotFound from './components/404/NotFound.js';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Profile from './components/profile/Profile';
import actions from './services/index';
import SearchMovies from './components/searchMovies';
import Movie from './components/movie';
import Show from './components/show';
import Friends from './components/friends';
import Feed from './components/feed'
import Axios from 'axios';
import Navbar from './components/navbar';
import Userpage from './components/userpage.js'





class App extends Component {
  state = { 
    user: null,
    selected: 1
  }
  
  componentDidMount() {
    this.updateData();
  }

  updateData = async () => {
    let user = await actions.isLoggedIn();
    if (user.data.error){
      this.setState({
        user: null
      }, () => {
        console.log('Error code ' + user.data.error)
      })
    } else {
      this.setState({
        user: user.data
      })
    }
  }

  setUser = (user) => {
    this.setState({
      user: user
    })
  }
  
  logOut = async () => {
    await actions.logOut()
    this.setUser(null);
  }

  render(){
    return (
    <BrowserRouter>
      {this.state.user &&
        <Navbar/>
      }
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} setUser={this.setUser} user={this.state.user}  updateData={this.updateData} /> } />
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.user}  logOut={this.logOut} updateData={this.updateData} />} />
        <Route exact path="/add" render={(props) => <SearchMovies {...props} user={this.state.user} updateData={this.updateData}  />} />
        <Route exact path="/movie/:id" render={(props) => <Movie {...props} user={this.state.user} updateData={this.updateData} />} />
        <Route exact path="/tv/:id" render={(props) => <Show {...props} user={this.state.user} updateData={this.updateData} />} />
        <Route exact path="/my-friends" render={(props) => <Friends {...props} user={this.state.user} updateData={this.updateData}/>} />
        <Route exact path="/my-feed" render={(props) => <Feed {...props} user={this.state.user} />} />
        <Route exact path="/userpage/:id" render={(props) => <Userpage {...props} user={this.state.user} />} />
        <Route component={NotFound} />

      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;