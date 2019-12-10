import React, {Component, Fragment} from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Profile from './components/profile/Profile'
import actions from './services/index'


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

  render(){

    return (
    <BrowserRouter>
      <nav className="navbar">
        <NavLink to="/" className="navbar-item">Home</NavLink>
        <NavLink to="/mylist" className="navbar-item">My List</NavLink>
        <NavLink to="/social" className="navbar-item">Social</NavLink>
        <NavLink to="/settings" className="navbar-item">Me Icon</NavLink>
      </nav>
      <nav>
        <NavLink to="/">Home |</NavLink>
  
        {this.state.email ? 
          <Fragment>
           <NavLink onClick={this.logOut} to='/'>Log Out |</NavLink> 
           <NavLink to="/profile">Profile|</NavLink>
           </Fragment>
           :
           <Fragment>
           <NavLink to="/sign-up">Sign Up |</NavLink>
           <NavLink to="/log-in">Log In |</NavLink>
           </Fragment>
          }

      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} user={this.state}/>} />
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state}/>} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;
