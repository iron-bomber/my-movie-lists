import React from 'react'
import { NavLink } from 'react-router-dom';
import {FiList} from 'react-icons/fi'
import {IoMdPeople, IoIosJournal, IoMdSettings} from 'react-icons/io'
import {MdSettings} from 'react-icons/md'
import {TiMessage} from 'react-icons/ti'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component{

    state = {
        one: 'selected-navbar columns',
        two: 'not-sel-navbar columns',
        three: 'not-sel-navbar columns',
        four: 'last-not-sel-navbar columns'
    }

    componentDidMount(){
        this.setIt()
    }

    setIt = () =>{
        switch(this.state.selected){
            case 1:
                this.setState({
                    one: 'selected-navbar columns',
                    two: 'not-sel-navbar columns',
                    three: 'not-sel-navbar columns',
                    four: 'last-not-sel-navbar columns',
                })
                break;
            case 2:
                this.setState({
                    one: 'not-sel-navbar columns',
                    two: 'selected-navbar columns',
                    three: 'not-sel-navbar columns',
                    four: 'last-not-sel-navbar columns',
                })
                break;
            case 3:
                this.setState({
                    one: 'not-sel-navbar columns',
                    two: 'not-sel-navbar columns',
                    three: 'selected-navbar columns',
                    four: 'last-not-sel-navbar columns',
                })
                break;
            case 4:
                this.setState({
                    one: 'not-sel-navbar columns',
                    two: 'not-sel-navbar columns',
                    three: 'not-sel-navbar columns',
                    four: 'last-selected-navbar columns',
                })
                break;
            default:
                break;
        }
    }

    selOne = () =>{
        this.setState({
          selected: 1
        },()=>{this.setIt()})
      }
      selTwo = () =>{
        this.setState({
          selected: 2
        },()=>{this.setIt()})
      }
      selThree = () =>{
        this.setState({
          selected: 3
        },()=>{this.setIt()})
      }
      selFour = () =>{
        this.setState({
          selected: 4
        },()=>{this.setIt()})
      }

    render(){
        return (
            <div>
                <nav className="ourbar">
                    <Link to="/" className="bar-logo" onClick={this.selOne} style={{textDecoration: 'none', color: 'white'}}>
                    <h1 className="pad-it-top">MML</h1>
                </Link>
                <div className="bar-list">
                    <NavLink to="/"  className={this.state.one} onClick={this.selOne}>
                        <IoIosJournal className="navbar-icons"/>
                        <span className="hidden-span">My list</span>
                    </NavLink>
                    <NavLink to="/my-feed" className={this.state.two} onClick={this.selTwo}>
                        <TiMessage  className="navbar-icons"/>
                    <span className="hidden-span">Feed</span>
                    </NavLink>
                    <NavLink to="/my-friends" className={this.state.three} onClick={this.selThree}>
                        <IoMdPeople  className="navbar-icons"/>
                    <span className="hidden-span">Social</span>
                    </NavLink>
                    <NavLink to ="/profile" className={this.state.four} onClick={this.selFour}>
                        <MdSettings  className="navbar-icons"/>
                    <span className="hidden-span">Settings</span>
                    </NavLink>
                </div>
                </nav>
            </div>
        )
    }
}
