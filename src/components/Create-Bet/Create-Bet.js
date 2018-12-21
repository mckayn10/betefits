import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchedUser from '../Searched-User/Searched-User';
import { searchedUser } from '../../redux/action';
import './create-bet.css';

class CreateBet extends Component {

    state = {
        title: '',
        details: '',
        amount: 0,
        searchText: '',
        isOffer: false,
        date: ''
    }


    async handleChange(key, value) {
        await this.setState({
            [key]: value
        })

    }

    async handleSearch(key, value) {
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
        axios.post('/create-offer', { state: this.state, creatorID: this.props.user.id, creatorUsername: this.props.user.username })
            .then(response => {
                this.setState({
                    title: '',
                    details: '',
                    amount: 0,
                    searchText: '',
                    creatorID: 0,
                    isOffer: false,
                    successText: ''
                })
                console.log('Offer has been added!')
            })
            .catch(err => {
                console.log('error creating bet', err)
            })
    }

    handleSendRequest = (user) => {
        axios.post('/send-request', { bet: this.state, user: this.props.user, selectedUser: user })
            .then(response => {
                console.log(response.data)
                this.setState({
                    successText: response.data
                })
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
        this.setState({
            searchText: username
        })
    }

    render() {

        console.log(this.state.date)


        return (
            <div className="view-container">
                <div className="create-view-container">
                    <div className="create-bet-container">
                        <h1>Create New Bet</h1>
                        <div className="category">
                            <h5>Title</h5>
                            <input name="title" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="category">
                            <h5>I Win If:</h5>
                            <input name="details" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="category" >
                            <h5>How Much?</h5>
                            <input id="create-amount" name="amount" onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="category">
                            <h5>Ends On:</h5>
                            <input type="date" name="date"
                                onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="search-offer-container">
                            <input className="search-send-container" value={this.state.searchText} placeholder="Search Users" name="searchText"
                                onChange={(e) => this.handleSearch(e.target.name, e.target.value)} />
                            <button className="add-offer-button" onClick={this.handleAddOffer.bind(this)}>Add to My Offers</button>
                            <div>{this.state.successText}</div>
                        </div>
                    </div>
                    <div className="create-search-container">
                        <SearchedUser updateSearch={this.updateSearch} sendRequest={this.handleSendRequest} />
                    </div>
                </div>
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

export default connect(mapStateToProps, { searchedUser })(CreateBet);