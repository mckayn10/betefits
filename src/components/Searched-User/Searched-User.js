import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedUser, logout } from '../../redux/action'
import './searched-user.css';


class SearchedUser extends Component {
    

    async handleSelect (selectedUser)  {
        
       await this.props.selectedUser(selectedUser)
        this.props.updateSearch(selectedUser.username)
    }

    

    render() {

        const searchedUsersList = this.props.searchedUser.map((user, i) => {
            return (
                <div key={i} className="searched-user">
                    <div> {user.username} </div>
                    <div> {user.id} </div>
                    <button index={i} onClick={() => this.handleSelect(user)} >Select User</button>
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
        searchedUser: state.searchedUser
    }
}

export default connect(mapStateToProps, { selectedUser, logout })(SearchedUser);
