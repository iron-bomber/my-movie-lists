import React, { Component } from 'react';
import actions from '../../services/index'


class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div>
        Welcome {this.props.user.email}.
      </div>
    );
  }
}

export default Home;
