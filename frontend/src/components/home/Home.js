import React, { Component } from 'react';
import actions from '../../services/index'
import axios from 'axios';
import {NavLink} from 'react-router-dom'


class Home extends Component {

  render() {
    return (
      
      <div>
      <nav>
        <button>All</button>
        <button>Watching</button>
        <button>Want to watch</button>
        <NavLink to="/add">Add</NavLink>
      </nav>
      </div>
    );
  }
}

export default Home;