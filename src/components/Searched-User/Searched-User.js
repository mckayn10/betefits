import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedUser, logout, profileUser } from '../../redux/action'
import './searched-user.css';
import {withRouter} from 'react-router-dom';


class SearchedUser extends Component {


    async handleSelect(selectedUser) {

        await this.props.selectedUser(selectedUser)
        this.props.updateSearch(selectedUser.username)
    }

    async handleViewProfile(user) {
        await this.props.profileUser(user)
        this.props.history.push(`/view-profile/${this.props.profileUser.username}`)
    }



    render() {

        const searchedUsersList = this.props.searchedUser.map((user, i) => {
            return (
                <div key={i} className="searched-user">
                    <div> {user.username} </div>
                    <div> {user.id} </div>
                    <button index={i} onClick={() => this.props.sendRequest(user)}>Send Request</button>
                    <button onClick={() => this.handleViewProfile(user)} >View Profile</button>
                </div>
            )
        })

        return (
            <div className="searched-user-container">
                <div>{searchedUsersList}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchedUser: state.searchedUser,
        profileUser: state.profileUser
    }
}

export default connect(mapStateToProps, { selectedUser, logout, profileUser })(withRouter(SearchedUser));
