import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css';
import '../../App.css';
import { connect } from 'react-redux';
import { sessionUser, searchedUser, logout, updatePicture, requestNotif } from '../../redux/action';
import axios from 'axios';


class Nav extends Component {

    state = {
        searchUser: '',
        numRequests: this.props.numRequests
    }

    componentDidMount = async () => {
        await this.callUserInfo()
    }

    callUserInfo = () => {
        axios.get('/user-info')
            .then(response => {
                this.props.sessionUser(response.data)
            })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.id !== prevProps.user.id) {
            this.callUserInfo()
        }
    }



    async handleSearch(value) {
        await this.setState({
            searchUser: value
        })
        axios.get(`/search/${this.state.searchUser}`)
            .then(response => {
                this.props.searchedUser(response.data)
                this.props.history.push('/search')
            })
    }

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
                            <div className="circular-image">
                                <img src={`${this.props.profileImage}`} />
                                {/* <div className="profile-pic" style={{
                                    backgroundImage: `url(${this.props.profileImage})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}></div> */}
                            </div>
                            <Link className="update-pic" to='/profile-picture'>Update</Link>
                            <h2 id="username">{this.props.user.username}</h2>
                            <h5 id="user-id">User ID: {this.props.user.id}</h5>
                        </div>
                        <Link to='/dashboard'><span id="item">Dashboard</span></Link>
                        <Link to='/my-offers'><span id="item">Offers</span></Link>
                        <Link to='/my-requests'><span id="item">Pending Requests</span> <span className="noti">{this.props.numRequests}</span> </Link>
                        <Link to='/create-bet'><span id="item">Create New Bet</span></Link>
                        <input value={this.state.searchUser} placeholder="search users" onChange={(e) => this.handleSearch(e.target.value)} />
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
        user: state.user,
        profileImage: state.profileImage,
        numRequests: state.numRequests
    }
}

export default connect(mapStateToProps, { sessionUser, searchedUser, logout, updatePicture, requestNotif })(withRouter(Nav));






