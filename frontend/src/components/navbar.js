import React from 'react'
import { NavLink } from 'react-router-dom';
import {FiList} from 'react-icons/fi'
import {IoMdPeople, IoIosJournal, IoMdSettings} from 'react-icons/io'
import {MdSettings} from 'react-icons/md'
import {TiMessage} from 'react-icons/ti'

export default class Navbar extends React.Component{

    state = {
        one: 'selected-navbar',
        two: 'not-sel-navbar',
        three: 'not-sel-navbar',
        four: 'last-not-sel-navbar'
    }

    componentDidMount(){
        this.setIt()
    }

    setIt = () =>{
        console.log('setit')
        switch(this.state.selected){
            case 1:
                this.setState({
                    one: 'selected-navbar',
                    two: 'not-sel-navbar',
                    three: 'not-sel-navbar',
                    four: 'last-not-sel-navbar',
                })
                break;
            case 2:
                this.setState({
                    one: 'not-sel-navbar',
                    two: 'selected-navbar',
                    three: 'not-sel-navbar',
                    four: 'last-not-sel-navbar',
                })
                break;
            case 3:
                this.setState({
                    one: 'not-sel-navbar',
                    two: 'not-sel-navbar',
                    three: 'selected-navbar',
                    four: 'last-not-sel-navbar',
                })
                break;
            case 4:
                this.setState({
                    one: 'not-sel-navbar',
                    two: 'not-sel-navbar',
                    three: 'not-sel-navbar',
                    four: 'last-selected-navbar',
                })
                break;
            default:
                break;
        }
    }

    selOne = () =>{
        console.log('one')
        this.setState({
          selected: 1
        },()=>{this.setIt()})
      }
      selTwo = () =>{
        console.log('two')
        this.setState({
          selected: 2
        },()=>{this.setIt()})
      }
      selThree = () =>{
        console.log('three')
        this.setState({
          selected: 3
        },()=>{this.setIt()})
      }
      selFour = () =>{
        console.log('four')
        this.setState({
          selected: 4
        },()=>{this.setIt()})
      }

    render(){
        console.log(this.state)
        return (
            <div>
                <nav className="ourbar">
                    <NavLink to="/"  className={this.state.one} onClick={this.selOne}>
                        <IoIosJournal className="navbar-icons"/>
                    </NavLink>
                    <NavLink to="/my-feed" className={this.state.two} onClick={this.selTwo}>
                        <TiMessage  className="navbar-icons"/>
                    </NavLink>
                    <NavLink to="/my-friends" className={this.state.three} onClick={this.selThree}>
                        <IoMdPeople  className="navbar-icons"/>
                    </NavLink>
                    <NavLink to ="/profile" className={this.state.four} onClick={this.selFour}>
                        <MdSettings  className="navbar-icons"/>
                    </NavLink>
                </nav>
            </div>
        )
    }
}
