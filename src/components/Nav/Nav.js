import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css';
import { connect } from 'react-redux';
import { sessionUser, searchedUser, logout } from '../../redux/action';
import axios from 'axios';


class Nav extends Component {

    state = {
        searchUser: ''
    }

    componentDidMount = () => {
        axios.get('/user-info')
            .then(response => {
                this.props.sessionUser(response.data)
            })
    }

    async handleSearch (value) {
        await this.setState({
            searchUser: value
        })
        axios.get(`/search/${this.state.searchUser}`)
            .then(response => {
                console.log(response.data)
                this.props.searchedUser(response.data)
                this.props.history.push('/search')
            })
    }

    // handleClickSearch = () => {
    //     axios.get(`/search/${this.state.searchUser}`)
    //         .then(response => {
    //             console.log(response.data)
    //             this.props.searchedUser(response.data)
    //             this.props.history.push('/search')
                
    //         })
    // }
 
    handleLogout = () => {
        this.props.history.push('/')
        axios.get('/logout')
            .then(response => {
                console.log(response.data)
                // this.props.logout()

            })

    }


    render() {
        if (this.props.location.pathname === '/') {
            return null
        } else {

            return (

                <div className="nav-container">
                    <div className="menu-container">
                        <div className="user-info">
                            <input value={this.state.searchUser} placeholder="search users" onChange={(e) => this.handleSearch(e.target.value)} />
                            <div className="profile-pic"></div>
                            <h2 id="username">{this.props.user.username}</h2>
                            <h5 id="username">User ID: {this.props.user.id}</h5>
                        </div>
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/my-offers'>My Offers</Link>
                        <Link to='/my-requests'>My Requests</Link>
                        <Link to='/create-bet'>Create New Bet</Link>
                    </div>
                    <div className="logout-button">
                        <h4 onClick={this.handleLogout} >Logout</h4>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { sessionUser, searchedUser, logout })(withRouter(Nav));