import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchedUser from '../Searched-User/Searched-User';
import {searchedUser} from '../../redux/action';

class CreateBet extends Component {

    state = {
        title: '',
        details: '',
        amount: 0,
        searchText: '',
        isOffer: false
    }


    async handleChange (key, value) {
       await this.setState({
            [key]: value
        })
        axios.get(`/search/${this.state.searchText}`)
            .then(response => {
                console.log(response.data)
                this.props.searchedUser(response.data)
            })
    }


    async handleAddOffer() {
        await this.setState({
            isOffer: true
        })
        axios.post('/create-offer', {state: this.state, creatorID: this.props.user.id})
            .then(response => {
                this.setState({
                    title: '',
                    details: '',
                    amount: 0,
                    searchText: '',
                    creatorID: 0,
                    isOffer: false
                })
            })
            .catch(err => {
                console.log('error creating bet', err)
            })
    }

    handleSendRequest = () => {
        axios.post('/send-request', {bet: this.state, user: this.props.user, selectedUser: this.props.selectedUser})
            .then(response => {
                console.log(response.data)
            })
    }

    handleClickSearch = () => {
        axios.get(`/search/${this.state.searchText}`)
            .then(response => {
                console.log(response.data)
                this.props.searchedUser(response.data)
                this.setState({
                    searchText: ''
                })
            })
    }

    updateSearch = (username) => {
        console.log(this.props.selectedUser)
        console.log(this.props.user)
        this.setState({
            searchText: username
        })
    }

    render() {


        return (
            <div className="view-container">
                <div>Create New Bet</div>
                <div>
                    <input placeholder="title" name="title" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input placeholder="details" name="details" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input placeholder="how much?" name="amount" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <input value={this.state.searchText} placeholder="Search Users" name="searchText" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                    <button onClick={this.handleClickSearch} >Search</button>
                    <button onClick={this.handleSendRequest} >Send Request</button>
                    <button onClick={this.handleAddOffer.bind(this)}>Add to My Offers</button>
                </div>
                <SearchedUser updateSearch={this.updateSearch} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedUser: state.selectedUser
    }
}

export default connect(mapStateToProps, {searchedUser})(CreateBet);